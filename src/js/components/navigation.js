"use strict";

/**
 * Navigation Component
 * --------------------
 * Handles the navigation interactions, including:
 * - Opening and closing the navigation
 * - Updating ARIA attributes
 * - Switching the navigation toggle icon
 * - Closing the navigation on outside clicks
 * - Closing the navigation when a navigation link is selected
 */

// ---------------------------------------------------------------------------
// Imports
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
export function initNavigation() {
  // -----------------------------------------------------------------------
  // DOM Elements
  // -----------------------------------------------------------------------
  const navigation = {
    navToggleButton: document.querySelector(".js-nav-toggle"),
    navList: document.querySelector(".nav__list"),
    navToggleIcon: document.querySelector(".nav__toggle-icon"),
    navLinks: document.querySelectorAll(".nav__link"),
  };

  // -----------------------------------------------------------------------
  // Guard Clause
  // -----------------------------------------------------------------------
  if (
    !navigation.navToggleButton ||
    !navigation.navList ||
    !navigation.navToggleIcon
  ) {
    return;
  }

  // -----------------------------------------------------------------------
  // Event Listeners
  // -----------------------------------------------------------------------
  navigation.navToggleButton.addEventListener("click", () => {
    toggleNavigation(navigation);
  });

  navigation.navLinks.forEach((navLink) => {
    navLink.addEventListener("click", () => {
      closeNavigation(navigation);
    });
  });

  document.addEventListener("click", (event) => {
    if (!isClickInsideNavigation(event)) {
      closeNavigation(navigation);
    }
  });
}

// ---------------------------------------------------------------------------
// Private Helper Functions
// ---------------------------------------------------------------------------
function toggleNavigation(navigation) {
  navigation.navList.classList.toggle("nav__list--active");

  updateNavigationToggleButton(navigation);
}

function closeNavigation(navigation) {
  navigation.navList.classList.remove("nav__list--active");

  updateNavigationToggleButton(navigation);
}

function updateNavigationToggleButton(navigation) {
  const isOpen = isNavigationOpen(navigation);

  navigation.navToggleButton.setAttribute("aria-expanded", isOpen);
  navigation.navToggleButton.setAttribute(
    "aria-label",
    isOpen ? "Close menu" : "Open menu",
  );
  navigation.navToggleIcon.classList.toggle("fa-bars", !isOpen);
  navigation.navToggleIcon.classList.toggle("fa-xmark", isOpen);
}

function isNavigationOpen(navigation) {
  return navigation.navList.classList.contains("nav__list--active");
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function isClickInsideNavigation(event) {
  return event.target.closest(".nav");
}
