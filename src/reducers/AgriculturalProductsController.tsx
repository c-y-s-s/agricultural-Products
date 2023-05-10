// Need to use the React-specific entry point to allow generating React hooks
import { createSlice } from "@reduxjs/toolkit";

export interface controllerState {
  toggleComponent: string;
  cropName: string;
  cropCode: string;
  selectDate: string;
  marketName: string;
}

const initialState: controllerState = {
  toggleComponent: "table",
  cropCode: "11",
  cropName: "",
  selectDate: "2023.05.07",
  marketName: "台北二",
};

export const AgriculturalProductsControllerSlice = createSlice({
  name: "AgriculturalProductsController",
  initialState,
  reducers: {
    setComponentToggle: (state, action) => {
      state.toggleComponent = action.payload;
    },
    setCropCode: (state, action) => {
      state.cropCode = action.payload;
    },
    setDate: (state, action) => {
      state.selectDate = action.payload;
    },
    setMarketName: (state, action) => {
      state.marketName = action.payload;
    },
    setCropName: (state, action) => {
      state.cropName = action.payload;
    },
  },
});

export const {
  setComponentToggle,
  setCropCode,
  setDate,
  setMarketName,
  setCropName,
} = AgriculturalProductsControllerSlice.actions;

const AgriculturalProductsControllerSliceReducer =
  AgriculturalProductsControllerSlice.reducer;

export default AgriculturalProductsControllerSliceReducer;
