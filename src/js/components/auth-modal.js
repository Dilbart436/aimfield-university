"use strict";

/**
 * Authentication Modal Component
 *
 * --------------------------------------------------------------------------
 * Handles the Authentication Modal interactions, including:
 *
 * - Opening and closing the Authentication Modal
 * - Password visibility toggle
 * - Authentication mode switching
 * - Form validation
 * - Validation error handling
 * - Accessibility behavior
 * - Focus management
 */

// ------------------------------------------------------------------------
// Imports
// ------------------------------------------------------------------------

// ------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------
const AUTH_MODES = {
  signin: {
    title: "Welcome Back",
    description: "Sign in to continue your learning journey.",
    submitButton: "Sign In",
    switchText: "Don't have an account?",
    toggleButton: "Create an account",
    forgotPassword: true,
  },

  signup: {
    title: "Create Your Account",
    description: "Join AIMFIELD University and start your learning journey.",
    submitButton: "Create Account",
    switchText: "Already have an account?",
    toggleButton: "Sign In",
    forgotPassword: false,
  },
};

// ------------------------------------------------------------------------
// State
// ------------------------------------------------------------------------
let activeTrigger = null;

// ------------------------------------------------------------------------
// Public API
// ------------------------------------------------------------------------
export function initAuthModal() {
  // --------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------
  const authModal = document.querySelector(".js-auth-modal");

  const authElements = {
    //  Modal Controls
    authTriggers: document.querySelectorAll(".js-auth-trigger"),
    closeButton: document.querySelector(".js-auth-close"),
    overlay: document.querySelector(".js-auth-overlay"),
    //  Form
    authForm: document.querySelector(".js-auth-form"),
    emailInput: document.querySelector(".js-email-input"),
    passwordInput: document.querySelector(".js-password-input"),
    passwordToggle: document.querySelector(".js-password-toggle"),
    passwordIcon: document.querySelector(".js-password-toggle i"),
    //  Actions
    forgotPasswordLink: document.querySelector(".js-forgot-password"),
    modeToggle: document.querySelector(".js-mode-toggle"),
    // Dynamic Content
    authTitle: document.querySelector(".js-auth-title"),
    authDescription: document.querySelector(".js-auth-description"),
    authSubmit: document.querySelector(".js-auth-submit"),
    authSwitchText: document.querySelector(".js-auth-switch-text"),
    //  Errors
    emailError: document.querySelector(".js-email-error"),
    passwordError: document.querySelector(".js-password-error"),
  };

  // --------------------------------------------------------------------
  // Guard Clause
  // --------------------------------------------------------------------
  if (!authModal) {
    return;
  }

  // --------------------------------------------------------------------
  // Event Listeners
  // --------------------------------------------------------------------
  authElements.authTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      activeTrigger = trigger;
      openModal(authModal, authElements);
    });
  });

  authElements.closeButton.addEventListener("click", () => {
    closeModal(authModal);
  });

  authElements.overlay.addEventListener("click", () => {
    closeModal(authModal);
  });

  document.addEventListener("keydown", (event) => {
    handleKeydown(event, authModal);
  });

  authElements.passwordToggle.addEventListener("click", () => {
    togglePasswordVisibility(authElements);
  });

  authElements.modeToggle.addEventListener("click", () => {
    handleModeToggle(authElements);
  });

  authElements.authForm.addEventListener("submit", (event) => {
    handleFormSubmit(event, authElements);
  });

  authElements.emailInput.addEventListener("input", () => {
    clearFieldError("email", authElements);
  });

  authElements.passwordInput.addEventListener("input", () => {
    clearFieldError("password", authElements);
  });
}

// ------------------------------------------------------------------------
// Private Helper Functions
// ------------------------------------------------------------------------
function openModal(authModal, authElements) {
  authModal.classList.add("auth-modal--open");
  document.body.classList.add("body--no-scroll");

  updateAuthMode("signin", authElements);

  authElements.emailInput.focus();
}

function closeModal(authModal) {
  if (!authModal.classList.contains("auth-modal--open")) {
    return;
  }

  authModal.classList.remove("auth-modal--open");
  document.body.classList.remove("body--no-scroll");

  if (activeTrigger) {
    activeTrigger.focus();
    activeTrigger = null;
  }
}

function handleKeydown(event, authModal) {
  if (event.key === "Escape") {
    closeModal(authModal);
    return;
  }

  if (event.key === "Tab") {
    trapFocus(event, authModal);
  }
}

function togglePasswordVisibility(authElements) {
  const isPasswordHidden = authElements.passwordInput.type === "password";

  if (isPasswordHidden) {
    authElements.passwordInput.type = "text";
    authElements.passwordToggle.setAttribute("aria-label", "Hide password");
    authElements.passwordToggle.setAttribute("aria-pressed", "true");
    authElements.passwordIcon.classList.replace("fa-eye", "fa-eye-slash");
    return;
  }

  authElements.passwordInput.type = "password";
  authElements.passwordToggle.setAttribute("aria-label", "Show password");
  authElements.passwordToggle.setAttribute("aria-pressed", "false");
  authElements.passwordIcon.classList.replace("fa-eye-slash", "fa-eye");
}

function updateAuthMode(mode, authElements) {
  const authMode = AUTH_MODES[mode];

  authElements.authTitle.textContent = authMode.title;
  authElements.authDescription.textContent = authMode.description;
  authElements.authSubmit.textContent = authMode.submitButton;
  authElements.authSwitchText.textContent = authMode.switchText;
  authElements.modeToggle.textContent = authMode.toggleButton;

  if (authMode.forgotPassword) {
    authElements.forgotPasswordLink.classList.remove("is-hidden");
  } else {
    authElements.forgotPasswordLink.classList.add("is-hidden");
  }

  if (mode === "signin") {
    authElements.modeToggle.dataset.mode = "signup";
    return;
  }

  authElements.modeToggle.dataset.mode = "signin";
}

function handleModeToggle(authElements) {
  const mode = authElements.modeToggle.dataset.mode;

  updateAuthMode(mode, authElements);
}

function handleFormSubmit(event, authElements) {
  event.preventDefault();

  clearValidationErrors(authElements);

  const email = authElements.emailInput.value.trim();
  const password = authElements.passwordInput.value;

  const validation = validateForm(email, password);

  if (!validation.isValid) {
    showValidationError(validation, authElements);
    return;
  }
}

/**
 * Validates the authentication form.
 * @returns {{
 *   isValid: boolean,
 *   field: string | null,
 *   message: string
 * }}
 */
function validateForm(email, password) {
  // Email Validation
  if (email === "") {
    return {
      isValid: false,
      field: "email",
      message: "Email is required.",
    };
  }

  if (!email.includes("@")) {
    return {
      isValid: false,
      field: "email",
      message: "Please enter a valid email address.",
    };
  }

  // Password Validation
  if (password === "") {
    return {
      isValid: false,
      field: "password",
      message: "Password is required.",
    };
  }

  if (password.length < 8) {
    return {
      isValid: false,
      field: "password",
      message: "Password must be at least 8 characters.",
    };
  }

  return {
    isValid: true,
    field: null,
    message: "",
  };
}

function clearValidationErrors(authElements) {
  authElements.emailError.textContent = "";
  authElements.passwordError.textContent = "";
}

function showValidationError(validation, authElements) {
  if (validation.field === "email") {
    authElements.emailError.textContent = validation.message;
  }

  if (validation.field === "password") {
    authElements.passwordError.textContent = validation.message;
  }
}

function clearFieldError(field, authElements) {
  if (field === "email") {
    authElements.emailError.textContent = "";
  }

  if (field === "password") {
    authElements.passwordError.textContent = "";
  }
}

function trapFocus(event, authModal) {
  // Get all focusable elements inside the modal.
  const focusableElements = authModal.querySelectorAll(
    "button, input, a[href]",
  );

  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  if (document.activeElement === lastFocusableElement) {
    event.preventDefault();
    firstFocusableElement.focus();
  }

  if (
    event.key === "Tab" &&
    event.shiftKey &&
    document.activeElement === firstFocusableElement
  ) {
    event.preventDefault();
    lastFocusableElement.focus();
  }
}
