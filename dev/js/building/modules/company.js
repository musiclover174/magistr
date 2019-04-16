import { qs, qsAll, getStyle } from './helpers';

export default class Company {
  constructor(moverClass, stickClass) {
    this.moverEl = moverClass;
    this.stickyEl = stickClass;

    if (qs(moverClass)) this.bindMover();
    if (qs(stickClass)) this.bindSticky();
  }

  bindMover() {
    const lines = qsAll(this.moverEl);
    const koef = 0.45;

    lines.forEach((line) => {
      line.setAttribute('data-left', '0');
    });

    window.addEventListener('scroll', () => {
      lines.forEach((line) => {
        const rect = line.getBoundingClientRect();
        const lineHeight = parseInt(getStyle(line).height, 10);
        const wHeigth = window.innerHeight || document.documentElement.clientHeight;
        if (
          rect.top + lineHeight >= 0
          && rect.bottom - lineHeight <= wHeigth
        ) {
          const diff = rect.bottom - lineHeight - wHeigth;
          line.style.left = `${+line.getAttribute('data-left') + diff * koef}px`;
        }
      });
    });
  }

  bindSticky() {
    const el = qs(this.stickyEl);
    const parent = qs('.js-about-stickyParent');
    const progress = qs('.js-fixer-progress');
    const counter = qs('.js-fixer-counter');
    const sqs = qsAll('.js-fixer-sq');
    let wHeigth = window.innerHeight || document.documentElement.clientHeight;

    window.addEventListener('resize', () => {
      wHeigth = window.innerHeight || document.documentElement.clientHeight;
      let eventScroll;
      try {
        eventScroll = new Event('scroll');
      } catch (e) {
        eventScroll = document.createEvent('Event');
        eventScroll.initEvent('scroll', false, false);
      }
      window.dispatchEvent(eventScroll);
    });

    window.addEventListener('scroll', () => {
      const rectParent = parent.getBoundingClientRect();
      const way = parseInt(getStyle(parent).height, 10) - wHeigth;

      let count = 0;
      sqs.forEach((sq) => {
        const sqRect = sq.getBoundingClientRect();
        if (sqRect.top - wHeigth <= 0) count += parseFloat(sq.dataset.sq);
      });

      if (rectParent.top <= 0 && rectParent.bottom - wHeigth >= 0) {
        // el.style.top = `${Math.abs(rectParent.top)}px`;
        el.style.top = '0px';
        el.style.left = `${Math.abs(rectParent.left)}px`;
        progress.style.height = `${Math.abs(rectParent.top) * 100 / way}%`;
        counter.textContent = count.toFixed(1);
        counter.parentNode.classList.remove('hide');
        el.classList.add('fixed');
      } else if (rectParent.top > 0) {
        el.style.top = '0px';
        el.style.left = '0px';
        progress.style.height = '0%';
        counter.parentNode.classList.add('hide');
        el.classList.remove('fixed');
      } else {
        el.classList.remove('fixed');
        el.style.top = `${way}px`;
        el.style.left = '0px';
        progress.style.height = '100%';
      }
    });
  }
}
