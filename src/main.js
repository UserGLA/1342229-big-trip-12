import TripMenu from "./view/trip-menu.js";
import TripInfo from "./view/trip-info.js";
import TripInfoTotal from "./view/trip-infoTotal.js";
import TripFilters from "./view/trip-filters.js";
import TripSort from "./view/trip-sort.js";
import TripDaysList from "./view/trip-daysList.js";
import TripDay from "./view/trip-day.js";
import TripEvent from "./view/trip-event.js";
/*
import EventNew from "./view/event-new.js";
*/
import EventEdit from "./view/event-edit.js";
import NoEvent from "./view/no-event.js";

import {events} from "./mock/event.js";
import {renderElement, RenderPosition, replace} from "./utils/render.js";

const dates = [...new Set(events.map((item) => new Date(item.startDate).toDateString()))];

const renderEvent = (eventElement, _event) => {
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

  renderElement(eventElement, eventComponent, RenderPosition.BEFOREEND);
};

const headerMainElement = document.querySelector(`.trip-main`);

renderElement(headerMainElement, new TripInfo(), RenderPosition.AFTERBEGIN);
renderElement(headerMainElement.querySelector(`.trip-main__trip-info`), new TripInfoTotal(), RenderPosition.BEFOREEND);
renderElement(headerMainElement.querySelector(`.trip-controls`), new TripMenu(), RenderPosition.AFTERBEGIN);
renderElement(headerMainElement.querySelector(`.trip-controls`), new TripFilters(), RenderPosition.BEFOREEND);
renderElement(document.querySelector(`.trip-events`), new TripSort(), RenderPosition.BEFOREEND);

if (events.length === 0) {
  renderElement(document.querySelector(`.trip-events`), new NoEvent(), RenderPosition.BEFOREEND);
} else {
  renderElement(document.querySelector(`.trip-events`), new TripDaysList(), RenderPosition.BEFOREEND);
}

dates.forEach((date, dateIndex) => {
  const day = new TripDay(new Date(date), dateIndex + 1).getElement();
  events
    .filter((_event) => new Date(_event.startDate).toDateString() === date)
    .forEach((_event) => {

      renderEvent(day.querySelector(`.trip-events__list`), _event);
    });
  renderElement(document.querySelector(`.trip-days`), day, RenderPosition.BEFOREEND);
});
