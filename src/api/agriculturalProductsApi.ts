// scr/features/api/todoApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface DataItem {
  Avg_Price: 15.2;
  CropCode: "11";
  CropName: "椰子";
  Lower_Price: 9.5;
  MarketCode: "104";
  MarketName: "台北二";
  Middle_Price: 14.9;
  TransDate: "112.05.05";
  Trans_Quantity: 2447;
  Upper_Price: 21.5;
}
interface reservoirType {
  Data: DataItem[];
  Next: boolean;
  RS: "string";
}

interface AgriculturalQueryType {
  CropCode?: string;
  startTime?: string;
  endTime?: string;
  marketName?: string;
  CropName?: string;
}

interface RainfallDataType {
  Data: any;
  Start_time: "string";
  End_time: "string";
  Station_name: "string";
  Station_ID: "string";
  TIME: "string";
  LAT: 0;
  LON: 0;
  ELEV: 0;
  RAIN: 0;
  MIN_10: 0;
  HOUR_3: 0;
  HOUR_6: 0;
  HOUR_12: 0;
  HOUR_24: 0;
  NOW: 0;
  CITY: "string";
  CITY_SN: 0;
  TOWN: "string";
  TOWN_SN: 0;
  ATTRIBUTE: "string";
}
export const agriculturalProductsApi = createApi({
  reducerPath: "agriculturalProductsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://data.coa.gov.tw/api/v1/",
  }),

  endpoints: (builder) => ({
    getAgriculturalData: builder.query<reservoirType, AgriculturalQueryType>({
      query: (parameter) =>
        `AgriProductsTransType/?Start_time=${parameter.startTime}&End_time=${parameter.endTime}&MarketName=${parameter.marketName}&api_key=${process.env.REACT_APP_COUNCIL_OF_AGRICULTURE}`,
    }),

    getRainfallData: builder.query<RainfallDataType, any>({
      query: (parameter: any) =>
        `AutoRainfallStationType/?Start_time=${parameter.time}&Station_ID=A1A9X0&api_key=${process.env.REACT_APP_COUNCIL_OF_AGRICULTURE}`,
    }),

    getAgriculturalChartData: builder.query<reservoirType, any>({
      query: (parameter) =>
        `AgriProductsTransType/?Start_time=${parameter.startTime}&End_time=${parameter.endTime}&CropCode=${parameter.CropCode}&MarketName=${parameter.marketName}&api_key=${process.env.REACT_APP_COUNCIL_OF_AGRICULTURE}`,
    }),
  }),
});

export const {
  useGetAgriculturalDataQuery,
  useGetAgriculturalChartDataQuery,
  useGetRainfallDataQuery,
} = agriculturalProductsApi;
