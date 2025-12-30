/**
 * Theme Manager
 * Handles Dark/Light mode toggling and persistence.
 */

export function initTheme() {
  const themeToggleBtn = document.querySelector('#theme-toggle');
  if (!themeToggleBtn) return;

  // Event Listener
  themeToggleBtn.addEventListener('click', toggleTheme);
  
  // Icon update
  updateThemeIcon();
}

/**
 * Toggles the theme between light and dark.
 */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  setTheme(newTheme);
}

/**
 * Sets the theme and persists it.
 * @param {string} theme - 'light' or 'dark'
 */
export function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon();
}

/**
 * Updates the toggle button icon based on current theme
 */
function updateThemeIcon() {
  const themeToggleBtn = document.querySelector('#theme-toggle i');
  if (!themeToggleBtn) return;
  
  const currentTheme = document.documentElement.getAttribute('data-theme');
  
  if (currentTheme === 'dark') {
    themeToggleBtn.className = 'bx bx-sun';
  } else {
    themeToggleBtn.className = 'bx bx-moon';
  }
}
