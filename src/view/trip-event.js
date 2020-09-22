/*
import {createElement} from "../utils/render.js";
*/
import Abstract from "./abstract.js";

const createTripEvent = (_event) => {
  const {city, price, point, startTime, endTime, offers} = _event;
  return (

    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${point.toLowerCase()}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${point} to ${city} </h3>

        <div class="event__schedule">
        <p class="event__time">
        <time class="event__start-time" datetime="2019-03-18T10:30">${startTime}</time>
        &mdash;
        <time class="event__end-time" datetime="2019-03-18T11:00">${endTime}</time>
        </p>
        <p class="event__duration">30M</p>
      </div>

      <p class="event__price">
      &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${
    offers.map((offer) => {
      return `<li class="event__offer">
          <span class="event__offer-title">${offer.title}</span>&plus;
          &euro;&nbsp;<span class="event__offer-price">${offer.price}</span>
          </li>`;
    }).slice(0, 3).join(``)
    }

      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`

  );
};

export default class TripEvent extends Abstract {
  constructor(_event) {
    super();
    this._event = _event;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createTripEvent(this._event);
  }
  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
