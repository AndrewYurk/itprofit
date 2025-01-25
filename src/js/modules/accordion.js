export function initAccordion() {
  const accordion = document.getElementById("accordion");
  if (!accordion) return;
  accordion.addEventListener("click", (event) => {
    const button = event.target.closest(".accordion-button");
    if (!button) return;
    const targetId = button.getAttribute("data-target");
    const targetBody = document.getElementById(targetId);
    if (!targetBody) return;
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    accordion.querySelectorAll(".accordion-body").forEach((body) => {
      body.classList.remove("active");
    });
    accordion.querySelectorAll(".accordion-button").forEach((btn) => {
      btn.setAttribute("aria-expanded", "false");
    });
    if (!isExpanded) {
      targetBody.classList.add("active");
      button.setAttribute("aria-expanded", "true");
    }
  });
}
