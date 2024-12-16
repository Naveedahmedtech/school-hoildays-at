const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../../lib/prisma");

const authController = {
  register: async (req, res) => {
    const { email, password, role, permissions = [] } = req.body;

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
          role: role?.toUpperCase() || "VIEWER", // Default role is 'VIEWER'
          permissions,
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
        {
          id: user.id,
          role: user.role,
          permissions: user.permissions,
          email: user.email,
        },
        process.env.JWT_SECRET || "_secret_key_",
        { expiresIn: "1h" } // Token expires in 1 hour
      );
      const maxAge =
        process.env.NODE_ENV !== "production"
          ? 24 * 60 * 60 * 1000 // 1 day in milliseconds
          : 60 * 60 * 1000; // 1 hour in milliseconds

      // Set the token in an HTTP-only cookie
      res.cookie("jwt", token, {
        httpOnly: true, // Prevent access via JavaScript
        secure: process.env.NODE_ENV === "production", // Send cookie only over HTTPS in production
        sameSite: "strict", // Strict same-site policy
        maxAge: maxAge,
      });

      res.status(200).json({
        message: "Signin successful",
        user: { id: user.id, email: user.email, role: user.role, permissions: user.permissions },
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

  getUsers: async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const users = await prisma.user.findMany({
        where: { role: { not: "ADMIN" } },
        select: {
          id: true,
          email: true,
          role: true,
          permissions: true,
        },
      });
      if (users.length === 0) {
        return res.status(200).json({ users: [] });
      }

      res.status(200).json({
        message: "Users retrieved successfully",
        users: users,
      });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getUser: async (req, res) => {
    const { id } = req.params;

    try {
      // Find the user by email
      const user = await prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          role: true,
          permissions: true,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Users retrieved successfully",
        user: user,
      });
    } catch (error) {
      console.error("Signin error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  updateUser: async (req, res) => {
    const { id: userId } = req.params;
    const { email, password, role, permissions } = req.body;

    try {
      // Find the user to ensure they exist
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Prepare data for the update
      const updateData = {
        email: email || existingUser.email, // Use existing email if none provided
        role: role ? role.toUpperCase() : existingUser.role, // Update role if provided
        permissions: permissions || existingUser.permissions, // Update permissions if provided
      };

      // Hash the password if it is provided
      if (password) {
        updateData.password = await bcrypt.hash(password, 10);
      }

      // Update the user
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: updateData,
      });

      res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  deleteUser: async (req, res) => {
    const { id: userId } = req.params;

    try {
      // Check if the user exists
      const existingUser = await prisma.user.findUnique({
        where: { id: userId },
      });
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Delete the user
      await prisma.user.delete({
        where: { id: userId },
      });

      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Delete error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authController;
