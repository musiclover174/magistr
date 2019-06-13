import { qs, qsAll } from './helpers';

export default class Catalog {
  constructor(rangeEl, sliderEl) {
    this.rangeEl = rangeEl;
    if (qs(this.rangeEl)) this.rangeInit();

    this.sliderEl = sliderEl;
    if (qs(this.sliderEl)) this.sliderInit();
  }

  rangeInit() {
    const slider = qs(this.rangeEl);
    const nativeInput = slider.previousElementSibling;
    const slideMin = +slider.getAttribute('data-min');
    const slideMax = +slider.getAttribute('data-max');
    const slideFrom = +slider.getAttribute('data-from') || slideMin;
    const slideTo = +slider.getAttribute('data-to') || slideMax;

    let firstFire = 0;

    noUiSlider.create(slider, {
      start: [slideFrom, slideTo],
      connect: true,
      step: 1000,
      range: {
        min: slideMin,
        max: slideMax,
      },
    });

    const nodes = [
      qs('.js-range-from'),
      qs('.js-range-to'),
    ];

    nodes.forEach((node) => {
      node.addEventListener('change', () => {
        const mass = [];
        nodes.forEach(inp => mass.push(parseInt(inp.value.replace(/\s/g, ''), 10)));
        slider.noUiSlider.set(mass);
      });
    });

    slider.noUiSlider.on('update', (values, handle) => {
      nodes[handle].value = (+values[handle]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      nativeInput.value = values.map(num => +num).join(':');

      if (firstFire < 2) {
        firstFire += 1;
        const event = new Event('keyup');
        nodes[handle].dispatchEvent(event);
      }
    });
  }

  sliderInit() {
    lightGallery(qs(this.sliderEl), {
      selector: '.catalog__slide',
    });

    const sliderCarousel = new Swiper(this.sliderEl, {
      speed: 700,
      slidesPerView: 'auto',
      spaceBetween: 36,
      loop: true,
      loopedSlides: qsAll('.swiper-slide', qs(this.sliderEl)).length,
      navigation: {
        nextEl: `${this.sliderEl} ~ .swiper-buttons .swiper-button-next`,
        prevEl: `${this.sliderEl} ~ .swiper-buttons .swiper-button-prev`,
      },
      breakpoints: {
        1600: {
          spaceBetween: 30,
        },
      },
    });
  }
}
