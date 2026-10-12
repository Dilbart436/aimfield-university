import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

export function initHeroSlider() {
  new Swiper(".hero__slider", {
    modules: [Navigation, Pagination, Autoplay],
    loop: true,

    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    // },

    navigation: {
      nextEl: ".hero__navigation--next",
      prevEl: ".hero__navigation--prev",
    },

    pagination: {
      el: ".hero__pagination",
      clickable: true,
    },
  });
}
