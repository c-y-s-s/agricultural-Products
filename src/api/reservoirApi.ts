// scr/features/api/todoApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface reservoirType {
  totalPage: "string";
  totalDataSize: "string";
  page: "string";
  Size: "string";
  responseData: [
    {
      EffectiveCapacity: any;
      ReservoirName(ReservoirName: any): unknown;
      EffectiveWaterStorageCapacity: any;
      WaterLevel: any;
      Date: string | number | Date;
      MonitorDate: "string";
      MonitorLocation: "string";
      Turbidity: "string";
    }
  ];
}

export const reservoirApi = createApi({
  reducerPath: "reservoirApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://data.wra.gov.tw/OpenAPI/",

  }),

  endpoints: (builder) => ({
    getReservoirData: builder.query<reservoirType, void>({
      query: () => `api/OpenData/2E684C4D-8ADF-43FC-A892-A2A4E9B68F8F/Data`,
    }),
    getZengwenReservoirData: builder.query<reservoirType, void>({
      query: () => `api/OpenData/2A49B760-3C0E-4288-B087-D71D6CB360E6/Data`,
    }),
    getAllReservoirData: builder.query<reservoirType, void>({
      query: () => `api/OpenData/50C8256D-30C5-4B8D-9B84-2E14D5C6DF71/Data`,
    }),
  }),
});

export const {
  useGetReservoirDataQuery,
  useGetZengwenReservoirDataQuery,
  useGetAllReservoirDataQuery,
} = reservoirApi;
