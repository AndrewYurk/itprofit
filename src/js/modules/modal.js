export function initModal() {
  const openButtons = document.querySelectorAll('.modal-button');
  const closeButtons = document.querySelectorAll('.close-btn');
  const body = document.body;

  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  body.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

  function openModal(modal) {
    modal.classList.add('show');
    body.classList.add('modal-open');
  }

  function closeModal(modal) {
    modal.classList.remove('show');
    body.classList.remove('modal-open');
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) openModal(modal);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const modal = button.closest('.modal');
      closeModal(modal);
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
      closeModal(event.target);
    }
  });
}
