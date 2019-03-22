import { qs, qsAll } from './helpers';

export default class Contacts {
  constructor(mapElem, btnElem = null) {
    this.el = qs(mapElem);
    this.btnEl = qsAll(btnElem);

    ymaps.ready(this.init.bind(this));

    if (this.btnEl.length) {
      this.addListener();
    }
  }

  init() {
    const pinCoord = this.el.getAttribute('data-center').split(':');
    const officeCoord = this.el.getAttribute('data-office').split(':');

    this.myMap = new ymaps.Map(this.el, {
      center: [parseFloat(pinCoord[0]), parseFloat(pinCoord[1])],
      zoom: 14,
      controls: ['smallMapDefaultSet'],
    });

    this.myMap.behaviors.disable('scrollZoom');

    const { locations } = this.el.dataset;
    locations.split(', ').forEach((item) => {
      const coords = item.split(':');

      const HouseMarker = new ymaps.Placemark(
        [parseFloat(coords[0]), parseFloat(coords[1])], {}, {
          iconLayout: 'default#image',
          iconImageSize: [31, 34],
          iconImageHref: './img/pin.png',
          iconImageOffset: [-32, -42],
        },
      );
      this.myMap.geoObjects.add(HouseMarker);
    });

    const OfficeMarker = new ymaps.Placemark(
      [parseFloat(officeCoord[0]), parseFloat(officeCoord[1])], {}, {
        iconLayout: 'default#image',
        iconImageSize: [31, 34],
        iconImageHref: './img/office-pin.png',
        iconImageOffset: [-32, -42],
      },
    );
    this.myMap.geoObjects.add(OfficeMarker);
  }

  addListener() {
    const t = this;

    this.btnEl.forEach((btn) => {
      btn.addEventListener('click', () => {
        const btnCoords = btn.getAttribute('data-coords').split(':');
        t.myMap.setCenter([parseFloat(btnCoords[0]), parseFloat(btnCoords[1])], 18);
      });
    });
  }
}
