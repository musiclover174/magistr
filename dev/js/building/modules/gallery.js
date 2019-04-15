import { qs, qsAll, eventsDispatcher } from './helpers';

export default class Gallery {
  constructor(galleryWrapperEl, galleryItemEl, galleryFilterEl) {
    this.galEl = galleryWrapperEl;
    this.itemEls = galleryItemEl;
    this.filterEl = galleryFilterEl;
    this.galInst = false;

    if (qs(this.galEl) && qsAll(this.itemEls).length) this.galleryInit();
    if (qs(this.filterEl)) this.filterInit();
  }

  galleryInit() {
    if (this.galInst) {
      window.lgData[qs(this.galEl).getAttribute('lg-uid')].destroy(true);
    } else {
      this.galInst = true;
    }
    lightGallery(qs(this.galEl), {
      selector: `.projects__elem:not(.hide) ${this.itemEls}`,
    });
  }

  filterInit() {
    qsAll(this.filterEl).forEach((item) => {
      item.addEventListener('click', () => {
        if (!item.classList.contains('active')) {
          qsAll(this.filterEl).forEach(filterTab => filterTab.classList.remove('active'));
          qsAll(this.itemEls).forEach(galItem => galItem.parentNode.classList.remove('hide'));
          item.classList.add('active');
          [...qsAll(this.itemEls)]
            .filter(galItem => (galItem.dataset.day !== item.dataset.day) && (item.dataset.day !== ''))
            .forEach(galItem => galItem.parentNode.classList.add('hide'));
          eventsDispatcher();
          this.galleryInit();
        }
      });
    });
  }
}
