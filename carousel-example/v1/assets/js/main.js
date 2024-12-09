;(function () {
  function simpleCarouselExample(wrapper, images) {
    if (!wrapper || !Array.isArray(images) || !images.length) {
      return
    }

    const $img = document.createElement('img')
    const $spin = wrapper.querySelector('.carousel-loader')
    const $prev = wrapper.querySelector('.carousel-buttons--prev')
    const $next = wrapper.querySelector('.carousel-buttons--next')

    let current = 0
    const state = []

    const showLoader = () => $spin?.style?.removeProperty('display')
    const hideLoader = () => $spin?.style?.setProperty('display', 'none')

    $prev.addEventListener('click', () => {
      if (current === 0) current = images.length - 1
      else current--

      $img.src = images[current]
      showLoader()
    })

    $next.addEventListener('click', () => {
      if (current === images.length - 1) current = 0
      else current++

      $img.src = images[current]
      showLoader()
    })

    window.addEventListener('load', () => {
      const $images = wrapper.querySelector('.carousel-images')
      if (!$images) return

      $img.alt = ''
      $img.src = images[current]

      $images.innerHTML = ''
      $images.append($img)

      for (let i = 0; i < images.length; i++) {
        state[i] = false
      }
    })

    $img.addEventListener('load', () => {
      console.log('SLIDE LOADED!!!')
      state[current] = true
      hideLoader()
    })
  }

  const carousel = document.querySelector('#my-carousel.carousel')

  const images = [
    'https://placehold.jp/3d4070/ffffff/960x480.jpg?text=First%20slide',
    'https://placehold.jp/31a903/ffffff/960x480.jpg?text=Second%20slide',
    'https://placehold.jp/0f939d/ffffff/960x480.jpg?text=Third%20slide',
  ]

  simpleCarouselExample(carousel, images)
})()
