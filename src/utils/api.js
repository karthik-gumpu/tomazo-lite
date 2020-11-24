import axios from "axios";
import { v4 as uuid } from "uuid";
import Promise from "bluebird";
import * as constants from "../constants";

Promise.config({
  cancellation: true,
});

const getFullUrl = (url) => {
  return `${constants.API_HOST}${url}`;
};

const simpleAxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "user-key": constants.ZOMATO_USER_KEY,
  },
});

class Api {
  constructor() {
    this.call = {};
  }

  doPromise = (axiosInstance, config, requestName) => {
    const requestPromise = new Promise((resolve, reject, onCancel) => {
      axiosInstance(config)
        .then(
          (success) => {
            resolve(success.data);
          },
          (error) => {
            if (axios.isCancel(error)) {
              console.log(`Request Aborted for ${config.url}`);
            } else if (error.response) {
              reject(error.response.data);
            } else {
              reject(error);
            }
          }
        )
        .catch((error) => {
          reject(error);
        });
      onCancel(() => {
        this.call[requestName].cancel();
      });
    });
    return requestPromise;
  };

  request = (config = {}) => {
    const requestName = uuid();
    this.call[requestName] = axios.CancelToken.source();
    config.cancelToken = this.call[requestName].token;
    config.url = getFullUrl(config.url);
    return this.doPromise(simpleAxiosInstance, config, requestName);
  };
}

// Utility method to cancel inprogress apis on need basis
const cancelApis = (apis = [], msg = "") => {
  for (let i = 0; i < apis.length; i++) {
    if (apis[i] && apis[i].cancel) {
      apis[i].cancel(msg);
    }
  }
};

const api = new Api();

export { cancelApis };
export default api;
