jQuery(function($) {
    let headerSticky = false;

    // Поведение верхнего меню при скроле
    if (headerSticky) {
        function fixDiv() {

            let $cache = $('#sticky');
            let heightTopHeader = parseInt($('.top-header').css('height'));

            if ($(window).scrollTop() >= heightTopHeader)
                $cache.addClass('sticked');
            else
                $cache.removeClass('sticked');
        }
        $(window).scroll(fixDiv);
        fixDiv();
    }
        
    // Настройки Слайдера
    let activeSlider = false;
    let slideNow = 1;
    let slideCount = $('#slidewrapper').children().length;
    let slideInterval = 5000;
    let navBtnId = 0;
    let translateWidth = 0;

    if(activeSlider) {
        $(document).ready(function() {
            let switchInterval = setInterval(nextSlide, slideInterval);

            $('.slide-nav-btn').eq(0).addClass('active');

            $('#viewport').hover(function() {
                clearInterval(switchInterval);
            }, function() {
                switchInterval = setInterval(nextSlide, slideInterval);
            });

            $('#next-btn').click(function() {
                nextSlide();
            });

            $('#prev-btn').click(function() {
                prevSlide();
            });

            $('.slide-nav-btn').click(function() {
                navBtnId = $(this).index();

                if (navBtnId + 1 != slideNow) {
                    translateWidth = -$('#viewport').width() * (navBtnId);
                    $('#slidewrapper').css({
                        'transform': 'translate(' + translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                    slideNow = navBtnId + 1;
                }

                if (!$('.slide-nav-btn').eq(navBtnId).hasClass('active')) {

                    clearSliderBtn();
                    $('.slide-nav-btn').eq(navBtnId--).addClass('active');
                } 
            });
        });
    }
        

    function clearSliderBtn() {
        for (var i = 0; i < $('.slide-nav-btn').length; i++) {
            $('.slide-nav-btn').eq(i).removeClass('active');
        }
    }

    function nextSlide() {

        if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
            $('#slidewrapper').css('transform', 'translate(0, 0)');
            clearSliderBtn();
            $('.slide-nav-btn').eq(0).addClass('active');
            slideNow = 1;
            let slideNowId = slideNow;
            
        } else {
            translateWidth = -$('#viewport').width() * (slideNow);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });

            clearSliderBtn();
            slideNow++;
            let slideNowId = slideNow - 1;
            $('.slide-nav-btn').eq(slideNowId).addClass('active');
        }
    }

    function prevSlide() {
        if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
            translateWidth = -$('#viewport').width() * (slideCount - 1);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow = slideCount;
        } else {
            translateWidth = -$('#viewport').width() * (slideNow - 2);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow--;
        }
    }
});