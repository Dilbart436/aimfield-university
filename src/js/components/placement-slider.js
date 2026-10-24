import Swiper from "swiper";
import { Pagination, Autoplay } from "swiper/modules";

export function initPlacementSlider() {
    new Swiper(".placement-support__slider", {
        modules: [Pagination, Autoplay],
        loop: true,
        spaceBetween: 14,

        pagination: {
            el: ".placement-support__swiper-pagination",
            clickable: true,
        },

        // autoplay: {
        //     delay: 2000,
        //     disableOnInteraction: false,
        // },

        breakpoints: {
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
        },
    });
}