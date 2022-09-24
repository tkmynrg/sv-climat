import Swiper, {Navigation, Pagination, Autoplay} from 'swiper';

export function initMainPageLanding() {
    function initShopSwiper() {
        new Swiper('#popular-product-swiper', {
            slidesPerView: "4",
            breakpoints: {
                320: {
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
                nextEl: '.main-button-next',
                prevEl: '.main-button-prev',
                clickable: true,
            }
        });
    }

    if ($('#popular-product-swiper').length) {
        initShopSwiper();
    }

}
