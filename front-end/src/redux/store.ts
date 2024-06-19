import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import sportsReducer from "./reducers/sportsReducer";
import courtReducer from "./reducers/courtReducer";
import bookingReducer from "./reducers/bookingReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    sport: sportsReducer,
    court: courtReducer,
    booking: bookingReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
