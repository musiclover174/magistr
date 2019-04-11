import {
  resizeWatcher,
  elemVisCheck,
  qs,
  qsAll,
} from './modules/helpers';
import Popup from './modules/popup';
import Forms from './modules/forms';
import Burger from './modules/burger';
import Contacts from './modules/contacts';
import News from './modules/news';
import History from './modules/history';
import Decor from './modules/decor';
import Faq from './modules/faq';

document.addEventListener('DOMContentLoaded', () => {
  const burger = new Burger();

  resizeWatcher();

  if (qsAll('.h-anim').length) elemVisCheck();

  if (qs('[data-popup]')) {
    window.popup = new Popup('[data-popup]');
  }

  if (qs('.js-news')) {
    const news = new News('.js-news');
  }

  if (qs('.js-news')) {
    const history = new History('.js-popup-history');
  }

  if (qs('form')) {
    const forms = new Forms();
  }

  if (qs('.glightbox')) {
    const lightBox = GLightbox({
      selector: 'glightbox',
    });
  }

  if (qs('.js-decor')) {
    const decors = new Decor();
  }

  if (qs('.js-faq-opener')) {
    const faq = new Faq('.js-faq-opener');
  }

  if (screen.width >= 768) {
    window.onload = () => {
      document.body.classList.add('load');
      let timeout = 2000;
      if (document.body.classList.contains('index')) timeout = 5700;
      setTimeout(() => {
        document.body.classList.add('load-end');
        if (qs('.js-contacts-map')) {
          const contacts = new Contacts('.js-contacts-map', '.js-contacts-btn');
        }
      }, timeout);
    };
  } else if (qs('.js-contacts-map')) {
    const contacts = new Contacts('.js-contacts-map', '.js-contacts-btn');
  }

  let eventScroll;
  try {
    eventScroll = new Event('scroll');
  } catch (e) {
    eventScroll = document.createEvent('Event');
    eventScroll.initEvent('scroll', false, false);
  }
  window.dispatchEvent(eventScroll);
});
