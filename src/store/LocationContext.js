import React from "react";
import { ZOMATO_LOCAL_STORAGE } from "../constants";
import { getKeyFromLocal } from "../utils/lsUtils";

const location = getKeyFromLocal(ZOMATO_LOCAL_STORAGE.LOCATION);

const LocationContext = React.createContext(location || {});

export default LocationContext;
