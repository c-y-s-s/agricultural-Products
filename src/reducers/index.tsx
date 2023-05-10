import { configureStore } from "@reduxjs/toolkit";
import { reservoirApi } from "../api/reservoirApi";
import { agriculturalProductsApi } from "../api/agriculturalProductsApi";

import AgriculturalProductsControllerSliceReducer from "./AgriculturalProductsController";
import { weatherApi } from "../api/weatherAPI";

export const store = configureStore({
  reducer: {
    [reservoirApi.reducerPath]: reservoirApi.reducer,
    [agriculturalProductsApi.reducerPath]: agriculturalProductsApi.reducer,
    [weatherApi.reducerPath]: weatherApi.reducer,

    AgriculturalProductsControllerSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      reservoirApi.middleware,
      agriculturalProductsApi.middleware,
      weatherApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
