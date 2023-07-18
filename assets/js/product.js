$(document).ready(function () {
    $('.tabs .tab').click(function () {
        $tab = $(this).data('tab');
        $('.tabs .tab').removeClass('active');
        $(this).addClass('active');
        
        $('.tab-content').addClass('animate__animated animate__fadeOut');
        $('.tab-content').on('animationend', function () {
            $('.tab-content').removeClass('animate__animated animate__fadeOut');
            $('.tab-content').hide();
            $('#' + $tab).addClass('animate__animated animate__fadeIn');
            $('#' + $tab).show();
        });
        // $('#' + $tab).addClass('active');
    });

    // Initialize the main slider
    $('#product-gallery .main-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        // fade: true,
        asNavFor: '.thumbnail-slider'
    });

    // Initialize the thumbnail slider
    $('#product-gallery .thumbnail-slider').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.main-slider',
        dots: false,
        // centerMode: true,
        focusOnSelect: true,
        infinite: true,
        arrows: false,
    });

    
});
