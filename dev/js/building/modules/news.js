export default class News {
  constructor(newsCarEl) {
    this.newsCarEl = newsCarEl;

    this.init();
  }

  init() {
    const newsCar = new Swiper(this.newsCarEl, {
      spaceBetween: 36,
      slidesPerView: 2,
      navigation: {
        nextEl: '.js-news-next',
        prevEl: '.js-news-prev',
      },
    });
  }
}
