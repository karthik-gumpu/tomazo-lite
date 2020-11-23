import { ZOMATO_LOCAL_STORAGE } from "../constants";

// Store json in zomato local storage
export const storeJsonInLocal = (jsonObj) => {
  if (typeof Storage !== "undefined") {
    const localStorageName = ZOMATO_LOCAL_STORAGE.STORAGE_NAME;
    const zomatoLocal = localStorage.getItem(localStorageName);
    let value = {};

    if (zomatoLocal) {
      value = { ...JSON.parse(zomatoLocal), ...jsonObj };
    } else {
      value = jsonObj;
    }

    localStorage.setItem(localStorageName, JSON.stringify(value));
  }
};

// Get the value of a key from zomato local storage
export const getKeyFromLocal = (key) => {
  if (typeof Storage !== "undefined") {
    const localStorageName = ZOMATO_LOCAL_STORAGE.STORAGE_NAME;
    let zomatoLocal = localStorage.getItem(localStorageName);

    if (zomatoLocal) {
      zomatoLocal = { ...JSON.parse(zomatoLocal) };
      if (zomatoLocal[key]) {
        return zomatoLocal[key];
      }
      return false;
    }
    return false;
  }
};
