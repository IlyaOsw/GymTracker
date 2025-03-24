import { legacy_createStore as createStore, combineReducers } from "redux";

import { socialMediaReducer } from "./reducers/socialMedia-reducer";
import { exercisesReducer } from "./reducers/exercises-reducer";
import { insideLookReducer } from "./reducers/insideLook-reducer";
import { calculatorReducer } from "./reducers/calculator-reducer";

const rootReducer = combineReducers({
  socialMedia: socialMediaReducer,
  exercises: exercisesReducer,
  insideLook: insideLookReducer,
  calculators: calculatorReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
