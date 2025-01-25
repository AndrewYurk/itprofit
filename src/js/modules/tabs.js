export function initTabs() {
  function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    if (tabs.length === 0 || tabPanes.length === 0) return;
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t) => t.classList.remove('active'));
        tabPanes.forEach((pane) => pane.classList.remove('active'));
        tab.classList.add('active');
        const target = tab.getAttribute('data-target');
        document.querySelector(target).classList.add('active');
      });
    });
  }
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    setupTabs();
  } else {
    document.addEventListener('DOMContentLoaded', setupTabs);
  }
}