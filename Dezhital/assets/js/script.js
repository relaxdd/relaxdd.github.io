class Slider {

    navBtnId = 0;
    translateWidth = 0;

    constructor(options) {
        this.container = $(options.container);
        this.slides = options.slides;
        this.slideNow = options.slideNow;
        this.slideCount = options.slides.length;
        this.slideInterval = options.slideInterval;

        // Стилистические настройкиж
        this.bottomNav = options.bottomNav || false;

        // Рендер слайдера
        this.render();
        this.start();
    }

    render(){
        let insertSlides = '',
            viewPort = '',
            navsBtnWrapper = '',
            navsBtn = '',
            sliderId = 0;

        for (let i = 0; i < this.slideCount; i++) {

            insertSlides += `
            <li class="slide" style="width: calc(100% / ${this.slideCount})">
                <img src="${this.slides[i]}" alt="${i}" class="slide-img">
            </li>`;

            navsBtn += `
            <li class="slide-nav-btn">
                <div class="slide-nav-btn__point"></div>
            </li>`;
        }

        if(this.bottomNav){
            navsBtnWrapper = `
            <ul class="nav-btns">
                ${navsBtn}
            </ul>`;
        } 
        
        viewPort = `
        <div id="slider-${sliderId}" class="slider_container" data-slider="${sliderId}">
            <div class="viewport">
                <ul class="slider_wrapper" style="width: calc(100% * ${this.slideCount})">
                    ${insertSlides}
                </ul>
                <div class="prev-next-btns">
                    <div class="prev-btn">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </div>
                    <div class="next-btn">
                        <i class="fa fa-chevron-right" aria-hidden="true"></i>
                    </div>
                </div>
                ${navsBtnWrapper}
            </div>
        </div>`;
        
        this.container.append(viewPort);
        sliderId += sliderId;
    }

    start() {
        let switchInterval = setInterval(this.nextSlide, this.slideInterval);
        const self = this;

        for (let i = 0; i < $('.slider_container').length; i++) {
            if (this.bottomNav) {
                $('.slider_container').eq(i).find('.slide-nav-btn').eq(this.navBtnId).addClass('active');
            };
        }
        

        // $('.viewport').hover(function() {
        //     clearInterval(switchInterval);
        // }, function() {
        //     switchInterval = setInterval(this.nextSlide, this.slideInterval);
        // });
        
        $('.slider_container').on('click', '.next-btn', function() {
            
            let prnt = $(this).parent();
            let ind = $('.slider_container').find('.next-btn').parent().index(prnt);

            // this.nextSlide(ind);
            console.log(ind);
        });
            
        $('.slider_container').on('click', '.prev-btn', function() {

            let prnt = $(this).parent();
            let ind = $(this).find('.prev-btn').parent().index(prnt);

            // this.prevSlide(ind);
            console.log(ind);
        });

        if(this.bottomNav){
            const slideNavBtn = document.querySelector('.slide-nav-btn');
            // let viewportWidth = document.querySelector('.viewport')[0].style.width()

            slideNavBtn.addEventListener('click', () => {
                this.navBtnId = $(this).index();

                if (this.navBtnId + 1 != this.slideNow) {
                    this.translateWidth = -$('.viewport').width() * (this.navBtnId);
                    $('#slidewrapper').css({
                        'transform': 'translate(' + this.translateWidth + 'px, 0)',
                        '-webkit-transform': 'translate(' + this.translateWidth + 'px, 0)',
                        '-ms-transform': 'translate(' + this.translateWidth + 'px, 0)',
                    });
                    this.slideNow = this.navBtnId + 1;
                }

                if (!$('.slide-nav-btn').eq(this.navBtnId).hasClass('active')) {

                    this.clearSliderBtn;
                    $('.slide-nav-btn').eq(this.navBtnId--).addClass('active');
                }
            })
        }   
    }

    clearSliderBtn() {
        for (var i = 0; i < $('.slide-nav-btn').length; i++) {
            $('.slide-nav-btn').eq(i).removeClass('active');
        }
    }

    nextSlide() {
        if (this.slideNow == this.slideCount || this.slideNow <= 0 || this.slideNow > this.slideCount) {
            $('#slidewrapper').css('transform', 'translate(0, 0)');
            this.clearSliderBtn;
            $('.slide-nav-btn').eq(0).addClass('active');
            this.slideNow = 1;
            let slideNowId = this.slideNow;

        } else {
            this.translateWidth = -$('#viewport').width() * (this.slideNow);
            $('#slidewrapper').css({
                'transform': 'translate(' + this.translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + this.translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + this.translateWidth + 'px, 0)',
            });

            this.clearSliderBtn;
            this.slideNow++;
            let slideNowId = this.slideNow - 1;
            $('.slide-nav-btn').eq(this.slideNowId).addClass('active');
        }
    }

    prevSlide() {
        if (this.slideNow == 1 || this.slideNow <= 0 || this.slideNow > this.slideCount) {
            this.translateWidth = -$('#viewport').width() * (this.slideCount - 1);
            $('#slidewrapper').css({
                'transform': 'translate(' + this.translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + this.translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + this.translateWidth + 'px, 0)',
            });
            this.slideNow = this.slideCount;
        } else {
            this.translateWidth = -$('#viewport').width() * (this.slideNow - 2);
            $('#slidewrapper').css({
                'transform': 'translate(' + this.translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + this.translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + this.translateWidth + 'px, 0)',
            });
            this.slideNow--;
        }
    }
};

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

    const slider = new Slider({
        container: '#block-for-slider',
        slides: ['img/marble/28.jpg', 'img/marble/31.jpg', 'img/marble/32.jpg', 'img/marble/33.jpg'],
        slideNow: 1,
        slideInterval: 4000,
        bottomNav: true
    });

});