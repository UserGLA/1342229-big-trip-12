import TripMenu from "./view/trip-menu.js";
import TripInfo from "./view/trip-info.js";
import TripInfoTotal from "./view/trip-infoTotal.js";
import TripFilters from "./view/trip-filters.js";
import {events} from "./mock/event.js";
import {renderElement, RenderPosition} from "./utils/render.js";
import Trip from "./presenter/trip.js";

const headerMainElement = document.querySelector(`.trip-main`);

renderElement(headerMainElement, new TripInfo(), RenderPosition.AFTERBEGIN);
renderElement(headerMainElement.querySelector(`.trip-main__trip-info`), new TripInfoTotal(), RenderPosition.BEFOREEND);
renderElement(headerMainElement.querySelector(`.trip-controls`), new TripMenu(), RenderPosition.AFTERBEGIN);
renderElement(headerMainElement.querySelector(`.trip-controls`), new TripFilters(), RenderPosition.BEFOREEND);

const tripPresentor = new Trip(document.querySelector(`.trip-events`));

tripPresentor.init(events);
