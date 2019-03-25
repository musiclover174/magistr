import { 
  qsAll,
  compareRandom,
  getRandomArbitrary,
} from './helpers';

export default class Decor {
  constructor(decorEl = '.js-decor') {
    this.decorEl = decorEl;

    if (qsAll(this.decorEl)) this.init();
  }

  init() {
    qsAll(this.decorEl).forEach(item => this.constructor.generateOne(item));
  }

  static generateOne(decItem) {
    const { type, height } = decItem.dataset;
    const arraySize = ['big', 'medium', 'small'];
    const arrayPosition = ['left', 'middle', 'right'];

    arraySize.sort(compareRandom);
    arrayPosition.sort(compareRandom);

    for (let i = 0; i < 3; i += 1) {
      const h = getRandomArbitrary(height * 0.2, height);
      const t = getRandomArbitrary(0, height - h);
      decItem.insertAdjacentHTML(
        'beforeend',
        `<span class="decor__elem" 
          data-type="${type}" 
          data-size="${arraySize[i]}" 
          data-position="${arrayPosition[i]}"
          style="height: ${h}px; top: ${t}px"
          ></span>`,
      );
    }
  }
}