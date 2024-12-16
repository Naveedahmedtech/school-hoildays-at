document.addEventListener("DOMContentLoaded", () => {
    const languageSelect = document.getElementById("language-select");
    const langFields = document.querySelectorAll(".lang-field");

    languageSelect.addEventListener("change", () => {
      const selectedLanguage = languageSelect.value;

      langFields.forEach((field) => {
        if (selectedLanguage === "all") {
          field.style.display = "block";
        } else if (field.classList.contains(`lang-${selectedLanguage}`)) {
          field.style.display = "block";
        } else {
          field.style.display = "none";
        }
      });
    });

    // Trigger change event on page load to show correct fields
    languageSelect.dispatchEvent(new Event("change"));
  });
