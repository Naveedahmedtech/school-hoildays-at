async function changeLanguage(lng) {
    try {
      const response = await fetch('/api/change-language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lng }),
      });
  
      const result = await response.json();
      if (response.ok) {
        window.location.reload(); // Reload the page to apply the new language
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error('Error changing language:', error);
    }
  }
  
  // Attach an event listener to the language selector
  document.getElementById('language-selector').addEventListener('change', (event) => {
    const selectedLanguage = event.target.value; // Get the selected language value
    changeLanguage(selectedLanguage); // Call the function with the selected language
  });
  