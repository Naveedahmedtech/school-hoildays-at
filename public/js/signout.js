document.getElementById('signout-btn').addEventListener('click', async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // Redirect to the login page or homepage after signing out
        window.location.href = '/admin/auth/signin';
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Failed to sign out. Please try again.');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  });
  