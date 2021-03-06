import Abstract from "./abstract.js";

const createTripInfoTotal = () => {
  return (

    `<p class="trip-info__cost">
          Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
        </p>`
  );
};

export default class TripInfoTotal extends Abstract {
  getTemplate() {
    return createTripInfoTotal();
  }
}
