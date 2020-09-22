/*
import {createElement} from "../utils/render.js";
*/
import Abstract from "./abstract.js";

const createTripMenu = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
       <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
       <a class="trip-tabs__btn" href="#">Stats</a>
     </nav>`
  );
};

export default class TripMenu extends Abstract {
  getTemplate() {
    return createTripMenu();
  }
}
