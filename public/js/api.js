document
.getElementById("translation-form")
.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(this);

  // Prepare the API payload
  const payload = {};
  for (const [key, value] of formData.entries()) {
    const [translationKey, lang] = key.split("[");
    const language = lang.replace("]", "");

    if (!payload[translationKey]) {
      payload[translationKey] = {};
    }
    payload[translationKey][language] = value;
  }

  // Send the API request
  try {
    const response = await fetch("/api/dashboard/translations/update", {
      method: "PUT",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        translations: payload,
      }),
    });

    const result = await response.json();
    if (response.ok) {
      alert("Translations updated successfully!");
      console.log(result);
    } else {
      alert("Failed to update translations");
      console.error(result);
    }
  } catch (err) {
    console.error("Error updating translations:", err);
    alert("An error occurred. Please try again.");
  }
});
