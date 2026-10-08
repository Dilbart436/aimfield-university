"use strict";

/**
 * Theme Component
 *
 * --------------------------------------------------------------------------
 * Handles the Theme interactions, including:
 *
 * - Initializing the saved theme
 * - Switching between light and dark themes
 * - Saving the selected theme
 * - Updating theme toggle buttons
 * - Updating theme icons
 */

// ------------------------------------------------------------------------
// Imports
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------
const THEME = {
  LIGHT: "light",
  DARK: "dark",
};

// ------------------------------------------------------------------------
// State
// ------------------------------------------------------------------------
let currentTheme = THEME.LIGHT;

// ------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------
export function initTheme() {
  // --------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------
  const themeElements = {
    toggleButtons: document.querySelectorAll(".js-theme-toggle"),
    icons: document.querySelectorAll(".nav__theme-icon"),
  };

  // --------------------------------------------------------------------
  // Guard Clause
  // --------------------------------------------------------------------
  if (!themeElements.toggleButtons.length) {
    return;
  }

  // --------------------------------------------------------------------
  // Load Saved Theme
  // --------------------------------------------------------------------
  const storedTheme = loadSavedTheme();

  // --------------------------------------------------------------------
  // Resolve Valid Theme
  // --------------------------------------------------------------------
  const selectedTheme =
    storedTheme === THEME.LIGHT || storedTheme === THEME.DARK
      ? storedTheme
      : THEME.LIGHT;

  // --------------------------------------------------------------------
  // Apply Theme
  // --------------------------------------------------------------------
  applyTheme(themeElements, selectedTheme);

  // --------------------------------------------------------------------
  // Event Listeners
  // --------------------------------------------------------------------
  themeElements.toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      switchTheme(themeElements);
    });
  });
}

// ------------------------------------------------------------------------
// Private Helper Functions
// ------------------------------------------------------------------------
function applyTheme(themeElements, selectedTheme) {
  document.documentElement.dataset.theme = selectedTheme;

  currentTheme = selectedTheme;

  updateThemeButton(themeElements, selectedTheme);
}

function switchTheme(themeElements) {
  const newTheme = currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;

  applyTheme(themeElements, newTheme);

  saveTheme(newTheme);
}

function updateThemeButton(themeElements, selectedTheme) {
  const isDarkTheme = selectedTheme === THEME.DARK;

  themeElements.toggleButtons.forEach((button) => {
    button.setAttribute(
      "aria-label",
      isDarkTheme ? "Switch to light mode" : "Switch to dark mode",
    );

    button.setAttribute("aria-pressed", String(isDarkTheme));
  });

  themeElements.icons.forEach((icon) => {
    icon.classList.toggle("fa-moon", !isDarkTheme);
    icon.classList.toggle("fa-circle-half-stroke", isDarkTheme);
  });
}

// ------------------------------------------------------------------------
// Utilities
// ------------------------------------------------------------------------
function loadSavedTheme() {
  return localStorage.getItem("theme");
}

function saveTheme(theme) {
  localStorage.setItem("theme", theme);
}
