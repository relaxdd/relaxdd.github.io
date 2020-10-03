class Slider {

	constructor(slideNow, slideCount, slideInterval, navBtnId, translateWidth) {
		this.slideNow = slideNow;
		this.slideCount = slideCount;
		this.slideInterval = slideInterval;
		this.navBtnId = navBtnId;
		this.translateWidth = translateWidth;
	}

    init() {
        $(document).ready(function() {
            let switchInterval = setInterval(this.nextSlide, this.slideInterval);

            $('#viewport').hover(function() {
                clearInterval(switchInterval);
            }, function() {
                switchInterval = setInterval(this.nextSlide, this.slideInterval);
            });

            $('#next-btn').click(function() {
                nextSlide();
            });

            $('#prev-btn').click(function() {
                prevSlide();
            });

            $('.slide-nav-btn').click(function() {
                this.navBtnId = $(this).index();

                if (this.navBtnId + 1 != slideNow) {
                    this.translateWidth = -$('#viewport').width() * (navBtnId);
                    $('#slidewrapper').css({
                        'transform': 'translate(' + translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
                    });
                    slideNow = this.navBtnId + 1;
                }
            });
        });
    }
}