const COUNT = 3;

import {createTripInfo} from "./view/trip-info.js";

import {createTripInfoTotal} from "./view/trip-infoTotal.js";

import {createTripMenu} from "./view/trip-menu.js";

import {createTripFilters} from "./view/trip-filters.js";

import {createTripSort} from "./view/trip-sort.js";

import {createEventEdit} from "./view/event-edit.js";

import {createTripDaysList} from "./view/trip-daysList.js";

import {createTripDays} from "./view/trip-days.js";

import {createTripDaysItem} from "./view/trip-daysItem.js";

import {createTripEvent} from "./view/trip-event.js";

/*
import {events} from "./mock/event.js";
*/

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

/*
const createElement = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;

  return element.firstChild;
};


const renderElement = (container, component, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.createElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component);
      break;
  }
};

const dates = [...new Set(events.map((item) => new Date(item.startDate).toDateString()))];
*/
const headerMainElement = document.querySelector(`.trip-main`);
render(headerMainElement, createTripInfo(), `afterbegin`);

const headerMainElementTotal = headerMainElement.querySelector(`.trip-main__trip-info`);
render(headerMainElementTotal, createTripInfoTotal(), `beforeend`);


const headerMenuElement = headerMainElement.querySelector(`.trip-controls`);
render(headerMenuElement, createTripMenu(), `afterbegin`);

render(headerMenuElement, createTripFilters(), `beforeend`);

const mainSortElement = document.querySelector(`.trip-events`);
render(mainSortElement, createTripSort(), `beforeend`);
render(mainSortElement, createEventEdit(), `beforeend`);
render(mainSortElement, createTripDaysList(), `beforeend`);

const tripDaysListElement = mainSortElement.querySelector(`.trip-days`);
render(tripDaysListElement, createTripDays(), `beforeend`);

const tripDaysElement = mainSortElement.querySelector(`.trip-days__item`);
render(tripDaysElement, createTripDaysItem(), `beforeend`);

const tripDaysItem = mainSortElement.querySelector(`.trip-events__list`);

for (let i = 0; i < COUNT; i++) {
  render(tripDaysItem, createTripEvent(), `beforeend`);
}
/*
dates.forEach((date, dateIndex) => {
  const day = createElement(createTripDays(new Date(date), dateIndex + 1));

  events
    .filter((_event) => new Date(_event.startDate).toDateString() === date)
    .forEach((_event, eventIndex) => {
      renderElement(day.querySelector(`.trip-events__list`), createTripEvent(_event));
    });
});
*/


