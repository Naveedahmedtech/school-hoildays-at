const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../../lib/prisma");

const authController = {
  register: async (req, res) => {
    const { email, password, role } = req.body;

    try {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role: role || "user", // Default role is 'user'
        },
      });

      res
        .status(201)
        .json({ message: "User registered successfully", user: newUser });
    } catch (error) {
      console.error("Register error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  signin: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Compare the passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      // Set the token in an HTTP-only cookie
      res.cookie("jwt", token, {
        httpOnly: true, // Prevent access via JavaScript
        secure: process.env.NODE_ENV === "production", // Send cookie only over HTTPS in production
        sameSite: "strict", // Strict same-site policy
        maxAge: 60 * 60 * 1000, // 1 hour in milliseconds
      });

      res.status(200).json({
        message: "Signin successful",
        user: { id: user.id, email: user.email, role: user.role },
      });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  logout: (req, res) => {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successful" });
  },
};

module.exports = authController;
