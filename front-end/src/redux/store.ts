import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import sportsReducer from "./reducers/sportsReducer";
import courtReducer from "./reducers/courtReducer";
import bookingReducer from "./reducers/bookingReducer";

// Configure Persist
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  sport: sportsReducer,
  court: courtReducer,
  booking: bookingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
