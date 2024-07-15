import { legacy_createStore as createStore, combineReducers } from "redux";

import { socialMediaReducer } from "./reducers/socialMedia-reducer";

const rootReducer = combineReducers({
  socialMedia: socialMediaReducer,
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer);
