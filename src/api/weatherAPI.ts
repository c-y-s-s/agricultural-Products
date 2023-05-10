// scr/features/api/todoApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface weatherType {
  records: any;
  status: "fulfilled";
  endpointName: "getWeatherData";
  requestId: "ZCLl4XqFJD4MtrFihYTAZ";
  startedTimeStamp: 1683529702402;
  data: {
    success: "true";
    result: {
      resource_id: "F-C0032-001";
      fields: [
        {
          id: "datasetDescription";
          type: "String";
        }
      ];
    };
    records: {
      datasetDescription: "三十六小時天氣預報";
      location: [
        {
          locationName: "臺北市";
          weatherElement: [
            {
              elementName: "Wx";
              time: [
                {
                  startTime: "2023-05-08 18:00:00";
                  endTime: "2023-05-09 06:00:00";
                  parameter: {
                    parameterName: "陰短暫陣雨";
                    parameterValue: "11";
                  };
                },
                {
                  startTime: "2023-05-09 06:00:00";
                  endTime: "2023-05-09 18:00:00";
                  parameter: {
                    parameterName: "多雲時晴";
                    parameterValue: "3";
                  };
                }
              ];
            }
          ];
        }
      ];
    };
  };
  fulfilledTimeStamp: 1683529702450;
  isUninitialized: false;
  isLoading: false;
  isSuccess: true;
  isError: false;
  currentData: {
    success: "true";
    result: {
      resource_id: "F-C0032-001";
      fields: [
        {
          id: "datasetDescription";
          type: "String";
        },
        {
          id: "locationName";
          type: "String";
        },
        {
          id: "parameterName";
          type: "String";
        },
        {
          id: "parameterValue";
          type: "String";
        },
        {
          id: "parameterUnit";
          type: "String";
        },
        {
          id: "startTime";
          type: "Timestamp";
        },
        {
          id: "endTime";
          type: "Timestamp";
        }
      ];
    };
    records: any;
  };
  isFetching: false;
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://opendata.cwb.gov.tw/api",
  }),

  endpoints: (builder) => ({
    getWeatherData: builder.query<weatherType, any>({
      query: (parameter) =>
        `v1/rest/datastore/F-C0032-001?Authorization=${process.env.REACT_APP_OPENDATA_CWD_GOV_KEY}&locationName=${parameter.cityName}&timeFrom=${parameter.Date}`,
    }),
  }),
});

export const { useGetWeatherDataQuery } = weatherApi;
