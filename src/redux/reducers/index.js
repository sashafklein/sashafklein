import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import data from "./data";
import openItems from "./openItems";
import settings from "./settings";
import breakpoint from "./breakpoint";

export const initialState = {};

export default history =>
  combineReducers({
    router: connectRouter(history),
    data,
    openItems,
    settings,
    breakpoint
  });
