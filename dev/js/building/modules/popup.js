import { qs, qsAll } from './helpers';

export default class Popup {
  constructor(sel, callback = null) {
    this.els = sel;
    this.callback = callback;
    this.open = this.popupOpen;
    this.popupHide = this.popupHide;
    this.openFlag = false;

    this.addListener();
  }

  addListener() {
    const that = this;

    qsAll(this.els).forEach((el) => {
      el.addEventListener('click', () => {
        that.popupOpen(el.getAttribute('data-src'));
        if (that.callback) that.callback();
      });
    });

    qsAll('.js-popclose').forEach((el) => {
      el.addEventListener('click', () => {
        that.popupHide();
      });
    });

    qs('.js-popbg').addEventListener('click', () => {
      that.popupHide();
    });
  }

  popupHide() {
    if (this.openFlag) {
      qsAll('.popup').forEach(item => item.classList.remove('show'));
      document.body.classList.remove('popup-show');
      this.openFlag = false;
    }
  }

  popupOpen(id) {
    if (id) {
      if (this.openFlag) {
        qsAll('.popup').forEach(item => item.classList.remove('show'));
      } else {
        document.body.classList.add('popup-show');
        this.openFlag = true;
      }
      qs(id).classList.add('show');
    }
  }
}
