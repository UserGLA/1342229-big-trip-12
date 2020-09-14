import TripMenu from "./view/trip-menu.js";
import TripInfo from "./view/trip-info.js";
import TripInfoTotal from "./view/trip-infoTotal.js";
import TripFilters from "./view/trip-filters.js";
import TripSort from "./view/trip-sort.js";
import TripDaysList from "./view/trip-daysList.js";
import TripDay from "./view/trip-day.js";
import TripEvent from "./view/trip-event.js";
import EventEdit from "./view/event-edit.js";

import {events} from "./mock/event.js";
import {renderElement, RenderPosition} from "./utils.js";

const dates = [...new Set(events.map((item) => new Date(item.startDate).toDateString()))];

const headerMainElement = document.querySelector(`.trip-main`);

renderElement(headerMainElement, new TripInfo().getElement(), RenderPosition.AFTERBEGIN);
renderElement(headerMainElement.querySelector(`.trip-main__trip-info`), new TripInfoTotal().getElement(), RenderPosition.BEFOREEND);
renderElement(headerMainElement.querySelector(`.trip-controls`), new TripMenu().getElement(), RenderPosition.AFTERBEGIN);
renderElement(headerMainElement.querySelector(`.trip-controls`), new TripFilters().getElement(), RenderPosition.BEFOREEND);
renderElement(document.querySelector(`.trip-events`), new TripSort().getElement(), RenderPosition.BEFOREEND);
renderElement(document.querySelector(`.trip-events`), new TripDaysList().getElement(), RenderPosition.BEFOREEND);

const renderEvent = (EventElement, _event) => {
  const EventComponent = new TripEvent(_event);
  const EventEditComponent = new EventEdit(_event);
  const replaceCardToForm = () => {
    EventElement.replaceChild(EventEditComponent.getElement(), EventComponent.getElement());
  };

  const replaceFormToCard = () => {
    EventElement.replaceChild(EventComponent.getElement(), EventEditComponent.getElement());
  };

  EventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  EventEditComponent.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, () => {
    replaceFormToCard();
  });
  EventEditComponent.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, () => {
    replaceFormToCard();
  });

  renderElement(EventElement, EventComponent.getElement(), RenderPosition.BEFOREEND);
};

dates.forEach((date, dateIndex) => {
  const day = new TripDay(new Date(date), dateIndex + 1).getElement();
  events
    .filter((_event) => new Date(_event.startDate).toDateString() === date)
    .forEach((_event) => {

      renderEvent(day.querySelector(`.trip-events__list`), _event);
    });
  renderElement(document.querySelector(`.trip-days`), day, RenderPosition.BEFOREEND);
});
