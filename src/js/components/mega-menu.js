"use strict";

/**
 * Mega Menu Component
 *
 * --------------------------------------------------------------------------
 * Handles the Mega Menu interactions, including:
 *
 * - Opening and closing the Mega Menu
 * - Updating ARIA attributes
 * - Managing desktop hover interactions
 * - Closing the Mega Menu when clicking outside the navigation
 * - Closing the Mega Menu when pressing the Escape key
 * - Closing the Mega Menu when switching from desktop to mobile
 * - Ensuring only one Mega Menu is open at a time
 */

// ------------------------------------------------------------------------
// Imports
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------
export function initMegaMenu() {
  // --------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------
  const megaMenu = {
    megaItems: document.querySelectorAll(".nav__item--mega"),
    nav: document.querySelector(".nav"),
    standardItems: document.querySelectorAll(
      ".nav__item:not(.nav__item--mega)",
    ),
  };

  // --------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------
  const isDesktop = window.matchMedia("(min-width: 1024px)");
  let closeTimer = null;

  // --------------------------------------------------------------------
  // Guard Clause
  // --------------------------------------------------------------------
  if (!megaMenu.megaItems.length || !megaMenu.nav) {
    return;
  }

  // --------------------------------------------------------------------
  // Event Listeners
  // --------------------------------------------------------------------
  megaMenu.megaItems.forEach((megaMenuItem) => {
    const trigger = megaMenuItem.querySelector(".nav__trigger");
    const menu = megaMenuItem.querySelector(".mega-menu");

    if (!trigger || !menu) {
      return;
    }

    trigger.addEventListener("click", () => {
      const isOpen = isMegaMenuOpen(megaMenuItem);

      if (isOpen) {
        closeMegaMenu(megaMenuItem);
        return;
      }
      openMegaMenu(megaMenuItem);
    });

    megaMenuItem.addEventListener("mouseenter", () => {
      if (!isDesktop.matches) {
        return;
      }
      clearTimeout(closeTimer);
      openMegaMenu(megaMenuItem);
    });
  });

  megaMenu.standardItems.forEach((navItem) => {
    navItem.addEventListener("mouseenter", () => {
      if (!isDesktop.matches) {
        return;
      }
      clearTimeout(closeTimer);
      closeActiveMegaMenu();
    });
  });

  megaMenu.nav.addEventListener("mouseleave", () => {
    if (!isDesktop.matches) {
      return;
    }
    closeTimer = setTimeout(() => {
      closeActiveMegaMenu();
    }, 200);
  });

  document.addEventListener("click", (event) => {
    if (!isClickInsideNavigation(event)) {
      closeActiveMegaMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }
    closeActiveMegaMenu();
  });

  isDesktop.addEventListener("change", (event) => {
    if (event.matches) {
      return;
    }
    closeActiveMegaMenu();
  });
}

// ------------------------------------------------------------------------
// Private Helper Functions
// ------------------------------------------------------------------------
function openMegaMenu(megaMenuItem) {
  if (!megaMenuItem) {
    return;
  }
  closeActiveMegaMenu();
  megaMenuItem.classList.add("nav__item--mega-active");
  updateMegaMenuTrigger(megaMenuItem);
}

function closeMegaMenu(megaMenuItem) {
  if (!megaMenuItem) {
    return;
  }
  megaMenuItem.classList.remove("nav__item--mega-active");
  updateMegaMenuTrigger(megaMenuItem);
}

function updateMegaMenuTrigger(megaMenuItem) {
  const trigger = megaMenuItem.querySelector(".nav__trigger");

  if (!trigger) {
    return;
  }
  const isOpen = isMegaMenuOpen(megaMenuItem);
  trigger.setAttribute("aria-expanded", isOpen);
}

function isMegaMenuOpen(megaMenuItem) {
  return megaMenuItem.classList.contains("nav__item--mega-active");
}

function closeActiveMegaMenu() {
  const activeMegaMenuItem = document.querySelector(".nav__item--mega-active");

  if (!activeMegaMenuItem) {
    return;
  }
  closeMegaMenu(activeMegaMenuItem);
}

// ------------------------------------------------------------------------
// Utilities
// ------------------------------------------------------------------------
function isClickInsideNavigation(event) {
  return event.target.closest(".nav");
}
