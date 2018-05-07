$(window).on('load', function() {
    if (target) {
        $('html, body').animate({
            scrollTop: $("#" + target).offset().top
        }, 700, 'swing', function () {});
    }
});
