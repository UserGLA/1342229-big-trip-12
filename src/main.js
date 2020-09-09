import {createTripInfo} from "./view/trip-info.js";
import {createTripInfoTotal} from "./view/trip-infoTotal.js";
import {createTripMenu} from "./view/trip-menu.js";
import {createTripFilters} from "./view/trip-filters.js";
import {createTripSort} from "./view/trip-sort.js";
import {createTripDaysList} from "./view/trip-daysList.js";
import {createTripDay} from "./view/trip-day.js";
import {createTripEvent} from "./view/trip-event.js";
import {createEventEdit} from "./view/event-edit.js";

import {events} from "./mock/event.js";
import {renderElement, createElement, RenderPosition} from "./utils.js";

const dates = [...new Set(events.map((item) => new Date(item.startDate).toDateString()))];

const headerMainElement = document.querySelector(`.trip-main`);

renderElement(headerMainElement, createElement(createTripInfo()), RenderPosition.AFTERBEGIN);
renderElement(headerMainElement.querySelector(`.trip-main__trip-info`), createElement(createTripInfoTotal()), RenderPosition.BEFOREEND);
renderElement(headerMainElement.querySelector(`.trip-controls`), createElement(createTripMenu()), RenderPosition.AFTERBEGIN);
renderElement(headerMainElement.querySelector(`.trip-controls`), createElement(createTripFilters()), RenderPosition.BEFOREEND);
renderElement(document.querySelector(`.trip-events`), createElement(createTripSort()), RenderPosition.BEFOREEND);
renderElement(document.querySelector(`.trip-events`), createElement(createTripDaysList()), RenderPosition.BEFOREEND);

dates.forEach((date, dateIndex) => {
  const day = createElement(createTripDay(new Date(date), dateIndex + 1));
  events
    .filter((_event) => new Date(_event.startDate).toDateString() === date)
    .forEach((_event, eventIndex) => {
      if (eventIndex === 0 && dateIndex === 0) {
        renderElement(day.querySelector(`.trip-events__list`), createElement(createEventEdit(_event)), RenderPosition.AFTERBEGIN);
      }
      renderElement(day.querySelector(`.trip-events__list`), createElement(createTripEvent(_event)), RenderPosition.BEFOREEND);
    });
  renderElement(document.querySelector(`.trip-days`), day, RenderPosition.BEFOREEND);
});
