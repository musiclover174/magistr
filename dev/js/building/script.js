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

  if (qs('form')) {
    const forms = new Forms();
  }

  if (qs('.glightbox')) {
    const lightBox = GLightbox({
      selector: 'glightbox',
    });
  }

  window.onload = () => {
    document.body.classList.add('load');
    setTimeout(() => {
      document.body.classList.add('load-end');
      if (qs('.js-contacts-map')) {
        const contacts = new Contacts('.js-contacts-map', '.js-contacts-btn');
      }
    }, 5000);
  };

  let eventScroll;
  try {
    eventScroll = new Event('scroll');
  } catch (e) {
    eventScroll = document.createEvent('Event');
    eventScroll.initEvent('scroll', false, false);
  }
  window.dispatchEvent(eventScroll);
});
