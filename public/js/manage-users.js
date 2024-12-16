document.addEventListener("DOMContentLoaded", () => {
  const noUsersMessage = document.getElementById("no-users-message");
  const usersTableContainer = document.getElementById("users-table-container");
  const usersTableBody = document.getElementById("users-table-body");

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/auth/users", {
        credentials: 'include'
      });
      const data = await response.json();

      if (data && data.users) {
        renderUsers(data.users);
      } else {
        renderUsers([]);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      renderUsers([]);
    }
  };

  const renderUsers = (users) => {
    if (users.length === 0) {
      noUsersMessage.style.display = "block";
      usersTableContainer.style.display = "none";
    } else {
      noUsersMessage.style.display = "none";
      usersTableContainer.style.display = "block";

      usersTableBody.innerHTML = users
        .map((user) => {
          console.log("User ID:", user.id); // Debugging user.id
          return `
          <tr>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.permissions.join(", ")}</td>
            <td>
              <button class="btn-edit" onclick="editUser('${
                user.id
              }')">Edit</button>
              <button class="btn-delete" onclick="deleteUser('${
                user.id
              }')">Delete</button>
            </td>
          </tr>
        `;
        })
        .join("");
    }
  };

  window.addUserPage = () => {
    // Redirect to add user page or perform add user action
    window.location.href = "/admin/create-user";
  };

  window.editUser = (userId) => {
    console.log("Redirecting to edit user:", userId); // Debugging
    window.location.href = `/admin/update-user?user_id=${userId}`;
  };

  window.deleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/auth/users/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("User deleted successfully.");
        fetchUsers();
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred while deleting the user.");
    }
  };

  fetchUsers();
});
