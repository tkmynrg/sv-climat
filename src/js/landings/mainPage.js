import Swiper, {Navigation, Autoplay} from 'swiper';

export function initMainPageLanding() {
    function initShopSwiper() {
        new Swiper('#popular-product-swiper', {
            slidesPerView: 4,
            modules: [Navigation, Autoplay],
            loop: false,
            breakpoints: {
                320: {
                    slidesPerView: 1
                },

                375: {
                    slidesPerView: 2
                },

                760: {
                    slidesPerView: 3
                },

                1200: {
                    slidesPerView: 4
                }
            },
            navigation: {
                nextEl: '.main-button-next-popular',
                prevEl: '.main-button-prev-popular',
                clickable: true,
            }
        });
    }

    if ($('#popular-product-swiper').length) {
        initShopSwiper();
    }

}
