import { qsAll } from './helpers';

export default class Faq {
  constructor(faqEl) {
    this.faqEl = qsAll(faqEl);

    if (this.faqEl.length) this.eventInit();
  }

  eventInit() {
    const elems = this.faqEl;
    elems.forEach((item) => {
      item.addEventListener('click', () => {
        if (!item.classList.contains('open')) {
          elems.forEach(faqElem => faqElem.classList.remove('open'));
        }
        item.classList.toggle('open');
      });
    });
  }
}
