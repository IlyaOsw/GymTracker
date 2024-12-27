import { legacy_createStore as createStore, combineReducers } from "redux";

import { socialMediaReducer } from "./reducers/socialMedia-reducer";
import { exercisesReducer } from "./reducers/exercises-reducer";
import { insideLookReducer } from "./reducers/insideLook-reducer";

const rootReducer = combineReducers({
  socialMedia: socialMediaReducer,
  exercises: exercisesReducer,
  insideLook: insideLookReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
