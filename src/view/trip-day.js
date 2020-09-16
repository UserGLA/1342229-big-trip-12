import {createElement} from "../utils.js";

const createTripDay = (data, index) => {
  return (
    `<li class="trip-days__item  day">
    <div class="day__info">
      <span class="day__counter">${index}</span>
      <time class="day__date" datetime="2019-03-18">${data.toUTCString().slice(0, 7)}</time>
    </div>
    <ul class="trip-events__list"></ul>
    </li>`
  );
};

export default class TripDay {
  constructor(date, dateIndex) {
    this.date = date;
    this.dateIndex = dateIndex;
    this._element = null;
  }

  getTemplate() {
    return createTripDay(this.date, this.dateIndex);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
