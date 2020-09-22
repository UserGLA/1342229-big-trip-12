/*
import {createElement} from "../utils/render.js";
*/
import Abstract from "./abstract.js";

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

export default class TripDay extends Abstract {
  constructor(date, dateIndex) {
    super();
    this.date = date;
    this.dateIndex = dateIndex;
  }

  getTemplate() {
    return createTripDay(this.date, this.dateIndex);
  }
}
