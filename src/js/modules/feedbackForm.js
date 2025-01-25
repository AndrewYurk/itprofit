export function initFeedbackForm() {
  const form = document.getElementById("feedbackForm");
  try {
    const mask = new Inputmask.default("+375 (99) 999-99-99");
    mask.mask(document.getElementById("phone"));
  } catch(error) {
    console.error("Error loading Inputmask:", error);
  };
  async function submitForm(event) {
    event.preventDefault();
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData.entries());
    try {
      document.querySelector('.contact-loading').classList.add('show')
      const response = await fetch("http://localhost:3000/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jsonData),
      });
      const result = await response.json();
      handleResponse(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  function handleResponse(response) {
    const errorMessages = document.querySelectorAll(".error-message");
    const inputs = form.querySelectorAll(".form-control");
    errorMessages.forEach((error) => (error.textContent = ""));
    inputs.forEach((input) => input.classList.remove("error"));
    document.querySelector('.contact-loading').classList.remove('show')

    if (response.status === "error") {
      for (const [field, message] of Object.entries(response.fields)) {
        const errorField = document.getElementById(`error-${field}`);
        const inputField = document.getElementById(field);
        if (errorField) {
          errorField.textContent = message;
        }
        if (inputField) {
          inputField.classList.add("error");
        }
      }
    } else if (response.status === "success") {
      form.reset();
      document.querySelector('.contact-success').classList.add('show')
    }
  }
  form.addEventListener("submit", submitForm);
}
