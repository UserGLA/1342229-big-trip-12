import Abstract from "./abstract.js";

const createTripDaysList = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripDaysList extends Abstract {
  getTemplate() {
    return createTripDaysList();
  }
}
