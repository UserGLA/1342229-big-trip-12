const AMOUNT_EVENT = 10;

import {getRandomInteger} from "./util.js";
import {TYPEPOINTS} from "./mock.js";
import {CITES} from "./mock.js";
import {DESCRIPTIONS} from "./mock.js";
import {OFFERS} from "./mock.js";

const generatePoint = () => {
  const randomPoint = getRandomInteger(0, TYPEPOINTS.length - 1);
  return TYPEPOINTS[randomPoint];
};

const generateCity = () => {
  const randomCity = getRandomInteger(0, CITES.length - 1);
  return CITES[randomCity];
};

const generateDescriptions = () => {
  const randomDescriptions = getRandomInteger(0, DESCRIPTIONS.length - 1);
  return DESCRIPTIONS[randomDescriptions];
};

const generatePhotos = () => `http://picsum.photos/248/152?r=${Math.random()}`;

const generateDate = () => {
  return (Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * getRandomInteger(0, 60) * 60 * 1000);
};

const startTime = [getRandomInteger(0, 22), getRandomInteger(10, 59)];
const endTime = [startTime[0] + 1, getRandomInteger(10, 59)];

const generateEvent = () => {
  const startDate = generateDate();
  const endDate = generateDate();
  return {
    point: generatePoint(),
    city: generateCity(),
    description: generateDescriptions(),
    startTime: startTime[0] + `:` + startTime[1],
    endTime: endTime[0] + `:` + endTime[1],
    startDate: Math.min(startDate, endDate),
    endDate: Math.max(startDate, endDate),
    price: getRandomInteger(10, 100),
    offer: OFFERS,
    photo: generatePhotos()
  };
};

const generateEvents = (num) => {
  return Array(num).fill().map(() => generateEvent()).sort((currentEvent, nextEvent) => currentEvent.startDate - nextEvent.startDate);
};

export const events = generateEvents(AMOUNT_EVENT);
