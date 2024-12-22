"use strict";
(function () {
    function extractAlt(src) {
        const clear = src.replace(/^(\bhttp)(|s):\/{2}/, '');
        return clear.split('/').at(-1)?.split('.')?.[0] || '';
    }
    function getMagicTotalWidth(config) {
        return Math.ceil(config.length / 2) * config.width + (config.length % 2 !== 0 ? 0 : config.height);
    }
    class Carousel {
        isInitialized = false;
        options;
        current;
        isWindowWasBlur = false;
        interval;
        elements;
        defaultOptions = {
            speed: 5000,
            type: 'blurring',
            pauseOnWindowBlur: true,
            initial: 0,
            autoplay: true,
            classes: {},
        };
        events = {
            initialized: [],
            destroyed: [],
            beforeToggle: [],
            afterToggle: [],
        };
        constructor(options) {
            this.options = Object.assign({}, this.defaultOptions, options);
            this.current = this.options.initial;
        }
        get initialized() {
            return this.isInitialized;
        }
        initialize(options = {}) {
            if (this.initialized)
                return;
            const $wrapper = document.querySelector(this.options.selector);
            if (!$wrapper)
                return;
            this.options = Object.assign({}, this.options, options);
            this.elements = this.renderCarouselElements($wrapper);
            this.renderCarouselSlides();
            if (this.options.type === 'magic') {
                this.setMagicCarouselTotalWidth();
            }
            this.current = this.options.initial;
            this.interval = this.initCarouselInterval(this.current);
            this.startCarouselEvents();
            this.isInitialized = true;
            this.runUsersEvents('initialized', this.current);
        }
        destroy() {
            if (!this.initialized)
                return;
            this.elements.$wrapper.innerHTML = '';
            clearInterval(this.interval);
            if (this.options.pauseOnWindowBlur) {
                window.removeEventListener('blur', this.onWindowBlurHandler.bind(this));
                window.removeEventListener('focus', this.onWindowFocusHandler.bind(this));
            }
            this.isInitialized = false;
            this.runUsersEvents('destroyed', this.current);
        }
        on(event, handler) {
            this.events[event].push(handler);
        }
        trigger(index) {
            this.moveToSomeSlide(index);
        }
        runUsersEvents(event, current) {
            for (const handler of this.events[event]) {
                handler(current);
            }
        }
        moveToSomeSlide(index) {
            clearInterval(this.interval);
            this.interval = this.initCarouselInterval(index);
        }
        startCarouselEvents() {
            this.elements.$prev.addEventListener('click', () => {
                this.moveToSomeSlide(this.decrementIndex(this.current));
            });
            this.elements.$next.addEventListener('click', () => {
                this.moveToSomeSlide(this.incrementIndex(this.current));
            });
            if (this.options.pauseOnWindowBlur) {
                window.addEventListener('blur', this.onWindowBlurHandler.bind(this));
                window.addEventListener('focus', this.onWindowFocusHandler.bind(this));
            }
            else {
                window.removeEventListener('blur', this.onWindowBlurHandler.bind(this));
                window.removeEventListener('focus', this.onWindowFocusHandler.bind(this));
            }
        }
        clearAndRenderFromSchema(root, list) {
            const result = list.reduce((acc, item) => {
                const $element = document.createElement(item?.element || 'div');
                const classes = (item?.classes || []).filter(Boolean);
                $element.classList.add(...classes);
                for (const [name, value] of Object.entries(item?.attributes || {})) {
                    $element.setAttribute(name, String(value));
                }
                if (Object.hasOwn(item, 'children')) {
                    this.clearAndRenderFromSchema($element, item.children);
                }
                acc.push($element);
                return acc;
            }, []);
            root.innerHTML = '';
            root.append(...result);
        }
        renderCarouselFromSchema($wrapper) {
            const struct = [
                {
                    element: 'div',
                    classes: ['carousel-inner'],
                    children: [
                        { element: 'div', classes: ['carousel-images'] },
                    ],
                },
                {
                    element: 'menu',
                    classes: ['carousel-buttons'],
                    children: [
                        {
                            element: 'input',
                            classes: ['carousel-buttons--prev'],
                            attributes: { type: 'button', value: 'Prev' },
                        },
                        {
                            element: 'input',
                            classes: ['carousel-buttons--next'],
                            attributes: { type: 'button', value: 'Next' },
                        },
                    ],
                },
            ];
            this.clearAndRenderFromSchema($wrapper, struct);
        }
        renderCarouselFromString($wrapper) {
            $wrapper.innerHTML = `
        <div class="carousel-images"></div>
        <menu class="carousel-buttons">
          <input class="carousel-buttons--prev" type="button" value="Prev" />
          <input class="carousel-buttons--next" type="button" value="Next" />
        </menu>`;
        }
        renderCarouselElements($wrapper) {
            switch (this.options.type) {
                case 'blurring':
                    this.renderCarouselFromString($wrapper);
                    break;
                case 'translate':
                case 'magic':
                    this.renderCarouselFromSchema($wrapper);
                    break;
            }
            return {
                $wrapper: $wrapper,
                $images: $wrapper.querySelector('.carousel-images'),
                $prev: $wrapper.querySelector('.carousel-buttons--prev'),
                $next: $wrapper.querySelector('.carousel-buttons--next'),
            };
        }
        renderCarouselSlides() {
            const schema = this.options.images.map((src, i) => ({
                element: 'div',
                classes: [
                    'carousel-images--slide',
                    (i === 0 ? '--slide-active' : ''),
                ],
                children: [
                    {
                        element: 'img',
                        attributes: { src, alt: extractAlt(src) },
                    },
                ],
            }));
            this.clearAndRenderFromSchema(this.elements.$images, schema);
            this.elements.$wrapper.removeAttribute('class');
            this.elements.$wrapper.classList.add('carousel', `--carousel-${this.options.type}`);
            this.elements.$wrapper.setAttribute('data-type', this.options.type);
        }
        toggleActiveVisible(index) {
            const imageList = this.elements.$wrapper.querySelectorAll('.carousel-images--slide');
            for (const $image of imageList) {
                $image.classList.remove('--slide-active');
            }
            imageList?.[index]?.classList?.add('--slide-active');
            if (this.options.type === 'translate') {
                this.elements.$images.style.setProperty('left', `calc(100% * ${index} * -1)`);
            }
            if (this.options.type === 'magic') {
                this.setMagicCarouselSlidesStyle();
            }
        }
        incrementIndex(index) {
            return index === this.options.images.length - 1 ? 0 : index + 1;
        }
        decrementIndex(index) {
            return index === 0 ? this.options.images.length - 1 : index - 1;
        }
        setMagicCarouselSlidesStyle() {
            const $slides = this.elements.$images.querySelectorAll('.carousel-images--slide');
            for (const [i, $slide] of $slides.entries()) {
                $slide.style.removeProperty('transform');
                switch (i) {
                    case this.current + 1:
                        $slide.style.setProperty('transform', `translate(-25%, 50%)`);
                        break;
                    case this.current + 2:
                        $slide.style.setProperty('transform', `translate(-100%, 200%)`);
                        break;
                }
            }
        }
        setMagicCarouselTotalWidth() {
            const config = {
                length: this.options.images.length,
                width: 960,
                height: 480,
            };
            const total = getMagicTotalWidth(config);
            this.elements.$images.style.setProperty('width', `${total}px`);
            const $slides = this.elements.$images.querySelectorAll('.carousel-images--slide');
            for (const $slide of $slides) {
                $slide.style.setProperty('width', `${config.width}px`);
                $slide.style.setProperty('height', `${config.height}px`);
            }
        }
        toggleActiveSlide(index) {
            this.runUsersEvents('beforeToggle', this.current);
            this.current = index;
            this.runUsersEvents('afterToggle', this.current);
            this.toggleActiveVisible(this.current);
        }
        initCarouselInterval(index) {
            this.toggleActiveSlide(index);
            if (!this.options.autoplay)
                return undefined;
            return setInterval(() => {
                this.toggleActiveSlide(this.incrementIndex(this.current));
            }, this.options.speed);
        }
        onWindowBlurHandler() {
            if (!this.isWindowWasBlur) {
                clearInterval(this.interval);
                this.isWindowWasBlur = true;
            }
        }
        onWindowFocusHandler() {
            if (this.isWindowWasBlur) {
                this.interval = this.initCarouselInterval(this.incrementIndex(this.current));
                this.isWindowWasBlur = false;
            }
        }
    }
    class ModalDialog {
        $element;
        options;
        ms = 300;
        constructor(selector, options = {}) {
            const find = document.querySelector(`dialog${selector}`);
            if (!find)
                throw new Error('Dialog element not found');
            const defaultOptions = {
                closeOnClickByBackdrop: true,
            };
            this.$element = find;
            this.options = Object.assign({}, defaultOptions, options);
            this.ms = this.getMs();
            if (this.options.closeOnClickByBackdrop) {
                this.$element.addEventListener('click', ({ target, currentTarget }) => {
                    if (target === currentTarget)
                        this.hide();
                });
            }
        }
        getMs() {
            const value = window.getComputedStyle(this.$element).getPropertyValue('--transition-ms');
            return value.endsWith('ms') ? +value.replace('ms', '') : +value.replace('s', '') * 1000;
        }
        show() {
            this.$element.showModal();
            this.$element.classList.add('modal-show');
        }
        hide() {
            this.$element.classList.remove('modal-show');
            setTimeout(() => this.$element.close(), this.ms);
        }
        addHideButton(selector) {
            document.querySelector(selector)?.addEventListener('click', this.hide.bind(this));
        }
        addShowButton(selector) {
            document.querySelector(selector)?.addEventListener('click', this.show.bind(this));
        }
        defineHiders() {
            this.$element.querySelectorAll('[data-hider]').forEach(($it) => {
                $it.addEventListener('click', this.hide.bind(this));
            });
        }
    }
    function insertConfigInForm($form, config) {
        $form.querySelector('[name="list-images"]').value = config.images.join('\n');
        $form.querySelector('[name="switching-speed"]').value = String(config.speed);
        $form.querySelector('[name="switching-type"]').value = config.type;
        $form.querySelector('[name="pause-on-blur"]').checked = config.pauseOnWindowBlur;
        $form.querySelector('[name="enable-autoplay"]').checked = config.autoplay;
    }
    function main() {
        const $form = document.querySelector('.page-config--form');
        const config = {
            type: 'translate',
            speed: 5000,
            images: [
                'https://placehold.jp/3d4070/ffffff/960x480.jpg?text=Slide%201',
                'https://placehold.jp/31a903/ffffff/960x480.jpg?text=Slide%202',
                'https://placehold.jp/0f939d/ffffff/960x480.jpg?text=Slide%203',
                'https://placehold.jp/a0130c/ffffff/960x480.jpg?text=Slide%204',
                'https://placehold.jp/0682a6/ffffff/960x480.jpg?text=Slide%205',
            ],
            pauseOnWindowBlur: false,
            autoplay: false,
        };
        const formMap = {
            type: {
                name: 'switching-type',
                default: config.type,
            },
            pauseOnWindowBlur: {
                name: 'pause-on-blur',
                default: config.pauseOnWindowBlur,
                transformFn: (value) => value === 'on',
            },
            autoplay: {
                name: 'enable-autoplay',
                default: config.autoplay,
                transformFn: (value) => value === 'on',
            },
            speed: {
                name: 'switching-speed',
                default: config.speed,
                transformFn: (it) => +it,
                validationFn: (it) => {
                    if (Number.isNaN(it) || !Number.isInteger(it)) {
                        return {
                            result: false,
                            error: 'Some unknown error in "switching-speed" field - 1',
                        };
                    }
                    return { result: true };
                },
            },
            images: {
                name: 'list-images',
                default: config.images,
                transformFn: (it) => it.split('\n'),
                validationFn: (it) => {
                    if (!Array.isArray(it) || it.length < 2) {
                        return {
                            result: false,
                            error: 'Some unknown error in "list-images" field - 1',
                        };
                    }
                    return { result: true };
                },
            },
        };
        const carousel = new Carousel({ selector: '#my-carousel', ...config });
        function parseAndValidateFormConfig(formData) {
            return Object.entries(formMap).reduce((acc, [key, it]) => {
                const formValue = String(formData.get(it.name) ?? '');
                acc[key] = Object.hasOwn(it, 'transformFn') ? it.transformFn(formValue) : formValue;
                if (Object.hasOwn(it, 'validationFn')) {
                    const validate = it.validationFn(acc[key]);
                    if (!validate.result)
                        throw new Error(validate.error);
                }
                return acc;
            }, {});
        }
        function onWindowLoadHandler() {
            insertConfigInForm($form, config);
            carousel.initialize();
        }
        function onFormResetHandler() {
            setTimeout(() => {
                insertConfigInForm(this, config);
            });
        }
        function onFormSubmitHandler(e) {
            e.preventDefault();
            const formData = new FormData(this);
            try {
                const newConfig = parseAndValidateFormConfig(formData);
                console.log(newConfig);
                carousel.destroy();
                carousel.initialize(newConfig);
            }
            catch (e) {
                alert(e?.message || 'Some unknown form error');
            }
        }
        const dialog = new ModalDialog('#customize-dialog', { closeOnClickByBackdrop: true });
        dialog.defineHiders();
        dialog.addShowButton('#show-dialog');
        $form.addEventListener('reset', onFormResetHandler);
        $form.addEventListener('submit', onFormSubmitHandler);
        window.addEventListener('load', onWindowLoadHandler);
    }
    main();
})();
