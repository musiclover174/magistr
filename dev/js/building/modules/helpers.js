function qs(query, root = document) {
  return root.querySelector(query);
}

function qsAll(query, root = document) {
  return root.querySelectorAll(query);
}

function compareRandom(a, b) {
  return Math.random() - 0.5;
}

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function fadeIn(elem, ms, cb, d = 'block') {
  if (!elem) return;

  elem.style.opacity = 0;
  elem.style.display = d;

  if (ms) {
    let opacity = 0;
    const timer = setInterval(() => {
      opacity += 50 / ms;
      if (opacity >= 1) {
        clearInterval(timer);
        opacity = 1;
        if (cb) cb()
      }
      elem.style.opacity = opacity;
    }, 50);
  } else {
    elem.style.opacity = 1;
    if (cb) cb();
  }
}

function fadeOut(elem, ms, cb) {
  if (!elem) return;

  elem.style.opacity = 1;

  if (ms) {
    let opacity = 1;
    const timer = setInterval(() => {
      opacity -= 50 / ms;
      if (opacity <= 0) {
        clearInterval(timer);
        opacity = 0;
        elem.style.display = 'none';
        if (cb) cb();
      }
      elem.style.opacity = opacity;
    }, 50);
  } else {
    elem.style.opacity = 0;
    elem.style.display = 'none';
    if (cb) cb();
  }
}

function scrollTo(to, duration) {
  if (duration <= 0) return;
  const element = document.documentElement;
  const difference = to - element.scrollTop;
  const perTick = difference / duration * 10;

  setTimeout(() => {
    element.scrollTop += perTick;
    scrollTo(to, duration - 10);
  }, 10);
}

function visChecker(el) {
  const rect = el.getBoundingClientRect();
  const wHeight = window.innerHeight || document.documentElement.clientHeight;
  return (
    rect.top <= wHeight * 0.65
  );
}

function resizeWatcher() {
  const tableSel = document.querySelectorAll('table');
  const scrollArray = [];
  if (tableSel.length) {
    tableSel.forEach((item, i) => {
      const orgHtml = item.outerHTML;

      item.outerHTML = `<div class='table-scroller${i}'>${orgHtml}</div>`;
      const ps = new PerfectScrollbar(`.table-scroller${i}`, {
        wheelPropagation: true,
      });

      scrollArray.push(ps);
    });

    window.addEventListener('resize', () => {
      if (scrollArray.length) {
        scrollArray.forEach((item) => {
          item.update();
        });
      }
    });
  }
}

function elemVisCheck() {
  window.addEventListener('scroll', () => {
    qsAll('.h-anim').forEach((elem) => {
      if (visChecker(elem)) elem.setAttribute('visible', true);
    });
  });
}

function scrollToInit() {
  qsAll('.js-scrollTo').forEach((elem) => {
    elem.addEventListener('click', (e) => {
      const toElem = qs(`[data-scrollId="${elem.getAttribute('data-to')}"]`);
      const { top } = toElem.getBoundingClientRect();
      const duration = elem.getAttribute('data-duration') || 1000;

      scrollTo(top, duration);
      e.preventDefault();
    })
  });
}

function eventsDispatcher() {
  let eventScroll;
  try {
    eventScroll = new Event('scroll');
  } catch (e) {
    eventScroll = document.createEvent('Event');
    eventScroll.initEvent('scroll', false, false);
  }
  window.dispatchEvent(eventScroll);

  let resizeScroll;
  try {
    resizeScroll = new Event('resize');
  } catch (e) {
    resizeScroll = document.createEvent('Event');
    resizeScroll.initEvent('scroll', false, false);
  }
  window.dispatchEvent(resizeScroll);
}

const getStyle = elem => getComputedStyle(elem);

export {
  fadeIn,
  fadeOut,
  scrollTo,
  visChecker,
  resizeWatcher,
  elemVisCheck,
  scrollToInit,
  qs,
  qsAll,
  getStyle,
  compareRandom,
  getRandomArbitrary,
  eventsDispatcher,
};
