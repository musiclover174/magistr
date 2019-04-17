import { qs } from './helpers';

export default class Catalog {
  constructor(rangeEl) {
    this.rangeEl = rangeEl;
    if (qs(this.rangeEl)) this.rangeInit();
  }

  rangeInit() {
    const slider = qs(this.rangeEl);
    const nativeInput = slider.previousElementSibling;
    const slideMin = +slider.getAttribute('data-min');
    const slideMax = +slider.getAttribute('data-max');
    const slideFrom = +slider.getAttribute('data-from') || slideMin;
    const slideTo = +slider.getAttribute('data-to') || slideMax;

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
    });
  }
}
