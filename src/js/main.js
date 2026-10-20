// Third-party styles
import "@fortawesome/fontawesome-free/css/all.min.css";
import "swiper/css";

// Application styles
import "../css/main.css";

// Layout
import { renderHeader } from "./layout/header.js";
import { renderFooter } from "./layout/footer.js";
// Components
import { initNavigation } from "./components/navigation.js";
import { initMegaMenu } from "./components/mega-menu.js";
import { initAuthModal } from "./components/auth-modal.js";
import { initHeroSlider } from "./components/hero-slider.js";
import { initPlacementSlider } from "./components/placement-slider.js";
// Theme
import { initTheme } from "./components/theme.js";

function initApp() {
  // Layout
  renderHeader();
  renderFooter();

  // Initialize Components
  initNavigation();
  initMegaMenu();
  initAuthModal();
  initHeroSlider();
  initPlacementSlider();

  // Initialize Theme
  initTheme();
}

initApp();
