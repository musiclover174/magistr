export default class History {
  constructor(popupCarouselEl = null) {
    this.popupCarousel = popupCarouselEl;

    if (this.popupCarousel) this.popupCarouselInit();
  }

  popupCarouselInit() {
    const historyCar = new Swiper(this.popupCarousel, {
      slidesPerView: 'auto',
      scrollbar: {
        el: '.js-history-scrollbar',
        draggable: true,
      },
    });

    window.addEventListener('resize', () => {
      historyCar.updateSize();
    });
  }
}
