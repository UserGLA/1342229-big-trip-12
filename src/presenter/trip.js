import TripSort from "../view/trip-sort.js";
import TripDaysList from "../view/trip-daysList.js";
import TripEvent from "../view/trip-event.js";
import TripDay from "../view/trip-day.js";
import EventEdit from "../view/event-edit.js";
import NoEvent from "../view/no-event.js";

import {renderElement, RenderPosition, replace} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._TripSortComponent = new TripSort();
    this._TripDaysListComponent = new TripDaysList();
    this._NoEventComponent = new NoEvent();

    this._events = null;
  }

  init(events) {
    if (events.length === 0) {
      renderElement(this._tripContainer, new NoEvent(), RenderPosition.BEFOREEND);
      return;
    }
    this._events = events.slice();
    this._renderSort();
    renderElement(this._tripContainer, this._TripDaysListComponent, RenderPosition.BEFOREEND);
    this._renderTrip(events);
  }

  _renderSort() {
    renderElement(this._tripContainer, this._TripSortComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip(events) {
    const dates = [...new Set(events.map((item) => new Date(item.startDate).toDateString()))];

    dates.forEach((date, dateIndex) => {
      const day = new TripDay(new Date(date), dateIndex + 1).getElement();
      events
        .filter((_event) => new Date(_event.startDate).toDateString() === date)
        .forEach((_event) => {

          this._renderEvent(day.querySelector(`.trip-events__list`), _event);
        });
      renderElement(this._TripDaysListComponent, day, RenderPosition.BEFOREEND);
    });

  }

  _renderEvent(container, _event) {
    const eventComponent = new TripEvent(_event);
    const eventEditComponent = new EventEdit(_event);
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    const replaceCardToForm = () => {
      replace(eventEditComponent, eventComponent);
    };

    const replaceFormToCard = () => {
      replace(eventComponent, eventEditComponent);
    };

    eventComponent.setEditClickHandler(() => {
      replaceCardToForm();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    eventEditComponent.setFormSubmitHandler(() => {
      replaceFormToCard();
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    renderElement(container, eventComponent, RenderPosition.BEFOREEND);
  }
  _renderNoEvents() {
    renderElement(this._tripContainer, this.__NoEventComponent, RenderPosition.BEFOREEND);
  }

}
