import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import logger from "redux-logger";

import { exercises } from "./reducers/exercises-reducer";
import { insideLook } from "./reducers/insideLook-reducer";
import { calculators } from "./reducers/calculator-reducer";
import { language } from "./reducers/language-reducer";
import { socialMedia } from "./reducers/socialMedia-reducer";
import { cards } from "./reducers/cards-reducer";

const rootReducer = combineReducers({
  socialMedia,
  exercises,
  insideLook,
  calculators,
  language,
  cards,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(logger));
