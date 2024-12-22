;(function () {
  /**
   * @param {string} src
   * @returns {string}
   */
  function extractAlt(src) {
    const clear = src.replace(/^(\bhttp)(|s):\/{2}/, '')
    return clear.split('/').at(-1).split('.')?.[0] || ''
  }

  /**
   * @param {HTMLElement} $wrapper
   * @param {Array<string>} images
   * @param {number|undefined} ms
   * @param {string|undefined} type
   * @returns {{destroy: () => void, initialize: () => void}}
   */
  function initAdvancedCarousel($wrapper, images, ms, type) {
    if (!$wrapper || !Array.isArray(images) || !images.length) {
      return {
        destroy: () => {
        }, initialize: () => {
        }
      }
    }

    let current = 0
    let interval = null
    let isWindowWasBlur = false

    const options = {
      ms: ms || 4000,
      type: type || $wrapper.dataset?.['type'] || 'normal'
    }

    // ****************************** //

    /**
     * @param {number} index
     */
    function toggleActive(index) {
      const imageList = $wrapper.querySelectorAll('.carousel-images--slide')

      for (const $image of imageList) {
        $image.classList.remove('--slide-active')
      }

      imageList?.[index]?.classList?.add('--slide-active')
    }

    function renderCarouselFromSchema() {
      const struct = [
        {
          element: 'div',
          classes: ['carousel-inner'],
          children: [
            { element: 'div', classes: ['carousel-images'] }
          ]
        },
        {
          element: 'div',
          classes: ['carousel-buttons'],
          children: [
            {
              element: 'input',
              classes: ['carousel-buttons--prev'],
              attributes: { type: 'button', value: 'Prev' }
            },
            {
              element: 'input',
              classes: ['carousel-buttons--next'],
              attributes: { type: 'button', value: 'Next' }
            },
          ]
        },
      ]

      function renderFromSchema(root, list) {
        const result = list.reduce((acc, item) => {
          const $element = document.createElement(item?.element || 'div')
          $element.classList.add(...(item?.classes || []))

          for (const [name, value] of Object.entries(item?.attributes || {})) {
            $element.setAttribute(name, String(value))
          }

          if (Object.hasOwn(item, 'children')) {
            renderFromSchema($element, item.children)
          }

          acc.push($element)
          return acc
        }, [])

        root.innerHTML = ''
        root.append(...result)
      }

      renderFromSchema($wrapper, struct)
    }

    function renderCarouselFromString() {
      $wrapper.innerHTML = `
        <div class="carousel-images"></div>
        <div class="carousel-buttons">
          <input class="carousel-buttons--prev" type="button" value="Prev" />
          <input class="carousel-buttons--next" type="button" value="Next" />
        </div>`
    }

    function defineElements() {
      const getElements = () => ({
        $images: $wrapper.querySelector('.carousel-images'),
        $prev: $wrapper.querySelector('.carousel-buttons--prev'),
        $next: $wrapper.querySelector('.carousel-buttons--next'),
      })

      const temp = getElements()
      if (Object.values(temp).every(Boolean)) return temp

      switch (options.type) {
        case 'normal':
          renderCarouselFromString()
          break
        case 'switch':
          renderCarouselFromSchema()
          break
      }

      return getElements()
    }

    /**
     * @param {HTMLElement} $images
     */
    function renderCarouselImageSlides($images) {
      const slides = images.map((src, i) => {
        const $div = document.createElement('div')
        const $img = document.createElement('img')

        $div.classList.add('carousel-images--slide')
        if (i === 0) $div.classList.add('--slide-active')

        $img.src = src
        $img.alt = extractAlt(src)

        $div.append($img)

        return $div
      })

      $images.innerHTML = ''
      $images.append(...slides)

      $wrapper.removeAttribute('class')
      $wrapper.classList.add('carousel', `--carousel-${options.type}`)
      $wrapper.setAttribute('data-type', options.type)
    }

    /**
     * @param {number} index
     * @returns {number}
     */
    function incrementIndex(index) {
      return index === images.length - 1 ? 0 : index + 1
    }

    /**
     *
     * @param {number} index
     * @returns {number}
     */
    function decrementIndex(index) {
      return index === 0 ? images.length - 1 : index - 1
    }

    function moveToPrevSlide() {
      current = decrementIndex(current)
      toggleActive(current)
    }

    function moveToNextSlide() {
      current = incrementIndex(current)
      toggleActive(current)
    }

    /** @param {number} index */
    function initCarouselInterval(index) {
      current = index
      toggleActive(current)

      return setInterval(() => {
        current = incrementIndex(current)
        toggleActive(current)
      }, options.ms)
    }

    function onWindowBlurHandler() {
      if (!isWindowWasBlur) {
        clearInterval(interval)
        isWindowWasBlur = true
      }
    }

    function onWindowFocusHandler() {
      if (isWindowWasBlur) {
        interval = initCarouselInterval(incrementIndex(current))
        isWindowWasBlur = false
      }
    }

    // ****************************** //

    function initializeFn() {
      const { $images, $next, $prev } = defineElements()

      renderCarouselImageSlides($images)
      interval = initCarouselInterval(current)

      $prev.addEventListener('click', () => {
        clearInterval(interval)
        moveToPrevSlide()

        interval = initCarouselInterval(current)
      })

      $next.addEventListener('click', () => {
        clearInterval(interval)
        moveToNextSlide()

        interval = initCarouselInterval(current)
      })
    }

    function destroyFn() {
      $wrapper.innerHTML = ''

      window.removeEventListener('blur', onWindowBlurHandler)
      window.removeEventListener('focus', onWindowFocusHandler)

      clearInterval(interval)
    }

    // ****************************** //

    window.addEventListener('blur', onWindowBlurHandler)
    window.addEventListener('focus', onWindowFocusHandler)

    return {
      initialize: initializeFn,
      destroy: destroyFn,
    }
  }

  function insertConfigInForm($form, config) {
    $form.querySelector('[name="list-images"]').value = config.images.join('\n')
    $form.querySelector('[name="switching-type"]').value = config.type
    $form.querySelector('[name="switching-speed"]').value = config.speed
  }

  function main() {
    const $form = document.querySelector('.page-config--form')
    const $carousel = document.querySelector('#my-carousel.carousel')

    const config = {
      type: 'normal',
      speed: 4000,
      images: [
        'https://placehold.jp/3d4070/ffffff/960x480.jpg?text=Slide%201',
        'https://placehold.jp/31a903/ffffff/960x480.jpg?text=Slide%202',
        'https://placehold.jp/0f939d/ffffff/960x480.jpg?text=Slide%203',
        'https://placehold.jp/a0130c/ffffff/960x480.jpg?text=Slide%204',
        'https://placehold.jp/0682a6/ffffff/960x480.jpg?text=Slide%205',
      ],
    }

    const formMap = [
      {
        key: 'type',
        name: 'switching-type',
        default: config.type,
      },
      {
        key: 'speed',
        name: 'switching-speed',
        default: config.speed,
        transformFn: (it) => +it,
        validationFn: (it) => {
          if (Number.isNaN(+it) || !Number.isInteger(it)) {
            return {
              result: false,
              error: 'Some unknown error in "switching-speed" field - 1',
            }
          }

          return { result: true }
        },
      },
      {
        key: 'images',
        name: 'list-images',
        default: config.images,
        transformFn: (it) => it.split('\n'),
        validationFn: (it) => {
          if (!Array.isArray(it) || it.length < 2) {
            return {
              result: false,
              error: 'Some unknown error in "list-images" field - 1',
            }
          }

          return { result: true }
        },
      },
    ]

    insertConfigInForm($form, config)
    const advancedCarouselRet = initAdvancedCarousel($carousel, config.images, config.speed, config.type)
    let destroyCarousel = advancedCarouselRet.destroy

    $form.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)

      try {
        const newConfig = formMap.reduce((acc, it) => {
          const formValue = formData.has(it.name) ? formData.get(it.name) : null
          acc[it.key] = Object.hasOwn(it, 'transformFn') ? it.transformFn(formValue) : formValue

          if (Object.hasOwn(it, 'validationFn')) {
            const validate = it.validationFn(acc[it.key])
            if (!validate.result) throw new Error(validate.error)
          }

          return acc
        }, {})

        destroyCarousel()

        const advancedCarouselRet = initAdvancedCarousel($carousel, newConfig.images, newConfig.speed, newConfig.type)
        advancedCarouselRet.initialize()

        destroyCarousel = advancedCarouselRet.destroy
      } catch (e) {
        alert(e?.message || 'Some unknown form error')
      }
    })

    $form.addEventListener('reset', (e) => {
      setTimeout(() => {
        insertConfigInForm(e.target, config)
      })
    })

    window.addEventListener('load', () => {
      advancedCarouselRet.initialize()
    })
  }

  main()
})()