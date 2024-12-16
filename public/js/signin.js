document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signin-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log(result);
        window.localStorage.setItem("school-user", JSON.stringify(result));
        alert("Sign in successful!");
        if (result.user.permissions.includes("manage ads")) {
          console.log(result.user.permissions, "Only Manage ads");
          window.location.href = "/admin/manage-ads";
        } else {
          console.log(result.user.permissions, "Manage content");
          window.location.href = "/admin/dashboard";
        }
      } else {
        alert(result.message || "Sign in failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
      alert("An error occurred. Please try again later.");
    }
  });
});
