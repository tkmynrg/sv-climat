import $ from 'jquery';
import Swiper, {Navigation, Pagination, Autoplay} from 'swiper';
import lozad from "lozad";
import 'jquery-validation';
import 'inputmask';

import {MobileMenu} from "./components/mobile-menu";
import {initMainPageLanding} from "./landings/mainPage";
import {initCatalogPageLanding} from "./pages/catalog-page";

let currentScroll = $(window).scrollTop();

$( document ).ready(function() {
    const mobileMenu = new MobileMenu();

    //lazyload
    const observer = lozad();
    observer.observe();

    headerAnimate();
    initCatalogPageLanding();

    $(window).on('scroll', function() {
        headerAnimate();
    });

    const divs = $('body').find('div.lozad');

    $('body').on('click', '.mobile-menu-toggle-button', function () {
        mobileMenu.toggle();
        return false;
    });

    //Открыть и закрыть контент на странице
    $('[data-toggle-btn]').click(function () {
        // просто спойлер
        if ($(this).parents('[data-toggle-holder]').hasClass('once')) {
            $(this).addClass('hide')
        }

        $(this).toggleClass('active').next().slideToggle(300)
    })

    if ($('#main_page').length) {
        initMainPageLanding();
    }


});

function headerAnimate() {
    const wHeight = $(window).height();
    const newScroll = $(window).scrollTop();

    if (newScroll > wHeight && newScroll > currentScroll) {
        $('body').addClass('hide-header');
    } else {
        $('body').removeClass('hide-header');
    }

    currentScroll = newScroll;
}




//swiper
const swiper = new Swiper('.main-slider', {
    effect: 'slide',
    fadeEffect: {
        crossFade: true
    },
    modules: [Navigation, Pagination, Autoplay],
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        999: {
            slidesPerView: 1,
        },
    },
    navigation: {
        nextEl: '.main-button-next',
        prevEl: '.main-button-prev',
        clickable: true,
    },
    pagination: {
        el: '.main-swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
});

//show content
function toggleSlide(item) {
    $(item).each(function(i) {
        $(this).on('click',function(e) {
            e.preventDefault();
            $('.tab-content-item-wrapper').eq(i).toggleClass('show');
        })
    })
};

toggleSlide('.more-link');
toggleSlide('.more-link-back');


//modals
$('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('fast');
});

$('.modal_close').on('click', function () {
    $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
});


$('.button-buy-catalog').each(function (i) {
    $(this).on('click', function() {
        $('#order .modal_description').text($('.tab-content-title').eq(i).text());
        $('.overlay, #order').fadeIn('fast');
    });
})

//form
function validateForm(form) {
    $(form).validate( {
        rules: {
            f_name: "required",
            f_phone: "required",
            f_email: {
                required: true,
                email: true
            }
        },
        messages: {
            f_name: "Введите корректное имя",
            f_phone: "Введите корректный номер телефона",
            f_email: {
                required: "Поле обязательно",
                email: "Введите свой реальный email"
            }
        },
    });
}

validateForm('#consultation-form');
validateForm('#consultation form');
validateForm('#order form');

//validate inputs
$('input[name=f_phone]').inputmask( {
    mask: '+7 999-999-99-99',
    showMaskOnHover: false
});

$('input[name=f_email]').inputmask( {
    mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
    showMaskOnHover: false
});

//dropdown faq
if ($('[data-open-block]').length) {
    $('[data-open-block]').on('click', function() {
        var $this = $(this),
            $parent = $this.parents('.item');

        $parent.toggleClass('open');
        return false;
    })
}
