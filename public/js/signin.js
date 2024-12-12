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
          alert("Sign in successful!");
          window.location.href = "/admin/dashboard"; // Redirect to dashboard
        } else {
          alert(result.message || "Sign in failed. Please try again.");
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  });
  