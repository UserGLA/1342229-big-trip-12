import TripMenu from "../view/trip-menu.js";
import TripInfo from "../view/trip-info.js";
import TripInfoTotal from "../view/trip-infoTotal.js";
import TripFilters from "../view/trip-filters.js";
import TripSort from "../view/trip-sort.js";
import TripDaysList from "../view/trip-daysList.js";
import TripEvent from "../view/trip-event.js";
/*
import EventNew from "../view/event-new.js";
import TripDay from "../view/trip-day.js";
*/
import EventEdit from "../view/event-edit.js";
import NoEvent from "../view/no-event.js";

import {renderElement, RenderPosition, replace} from "../utils/render.js";

export default class Trip {
  constuctor(tripContainer) {
    this._tripContainer = tripContainer;
    this._TripMenuComponent = new TripMenu();
    this._TripInfoComponent = new TripInfo();
    this._TripInfoTotalComponent = new TripInfoTotal();
    this._TripFiltersComponent = new TripFilters();
    this._TripSortComponent = new TripSort();
    this._TripDaysListComponent = new TripDaysList();
    this._NoEventComponent = new NoEvent();
  }

  init(listEvents) {
    this._listEvents = listEvents.slice();
    renderElement(this._tripContainer, this.__TripMenuComponent, RenderPosition.BEFOREEND);
    renderElement(this._tripContainer, this._TripInfoComponent, RenderPosition.BEFOREEND);
    renderElement(this._tripContainer, this._TripInfoTotalComponent, RenderPosition.BEFOREEND);
    renderElement(this._tripContainer, this._TripFiltersComponent, RenderPosition.BEFOREEND);
    renderElement(this._tripContainer, this._TripDaysListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _renderSort() {
    renderElement(this._tripContainer, this._TripSortComponent, RenderPosition.BEFOREEND);
  }
  _renderEvents(_event) {
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
    renderElement(this.__TripDaysListComponent, eventComponent, RenderPosition.BEFOREEND);
  }
  _renderNoEvents() {
    renderElement(this._tripContainer, this.__NoEventComponent, RenderPosition.BEFOREEND);
  }

}
