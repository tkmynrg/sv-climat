import $ from "jquery";

export function initMobileMenu() {
    $('.mobile-menu-toggle-button').on('click', function() {
        $('html').toggleClass('open-mobile-menu');
        $('html').removeClass('open-mobile-menu-level-2');
        return false;
    });

    $('#mobile_menu').on('click', 'a[data-submenu]', function() {
        var submenu = $(this).attr('data-submenu');

        $('#mobile_menu .level-2 [data-submenu]').addClass('hide');
        $('#mobile_menu .level-2 [data-submenu="' + submenu + '"]').removeClass('hide');

        $('html').addClass('open-mobile-menu-level-2');

        return false;
    });

    $('#mobile_menu .level-2').on('click', 'a', function () {
        $('.toggle-mobile-menu-button').trigger('click');
    })

    $('.mobile-menu-back').on('click', function() {
        $('html').removeClass('open-mobile-menu-level-2');
        return false;
    });
}

$(".mobile-menu-toggle-button").click (function(){
    $("html").toggleClass("mobile-menu-open");
});

