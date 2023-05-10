import { Bar } from "react-chartjs-2";
import { useGetZengwenReservoirDataQuery } from "../api/reservoirApi";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ZengwenReservoirContainer = styled.div`
  .remind-text {
    color: #656565;
    font-size: 12px;
    text-align: end;
  }
`;
const ZengwenReservoirChart = () => {
  // 曾文水庫 API
  const ZengwenReservoirTotalData = useGetZengwenReservoirDataQuery();
  const ZengwenReservoirData = ZengwenReservoirTotalData.data;

  // 線圖 labels
  const [zengwenReservoirLabels, setZengwenReservoirLabels] = useState<any>();
  // 線圖 水位資料
  const [waterLevelData, setWaterLevelData] = useState<any>();

  // 線圖要傳進去的物件
  const [barChartData, setBarChartData] = useState<any>({
    labels: zengwenReservoirLabels,
    datasets: [
      {
        data: waterLevelData,
        borderWidth: 2,
        backgroundColor: "pink",
      },
    ],
  });
  const [barChartOptions, setBarChartOptions] = useState<any>({
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  });

  //組 labels
  useEffect(() => {
    if (ZengwenReservoirData) {
      // label 需要呈現的時間格式
      const labelsData = ZengwenReservoirData?.responseData?.reduce(
        (acc, cur) => {
          const hour =
            new Date(cur?.Date).getHours() < 10
              ? "0" + new Date(cur?.Date).getHours()
              : new Date(cur?.Date).getHours();
          const minute =
            new Date(cur?.Date).getMinutes() < 10
              ? new Date(cur?.Date).getMinutes() + "0"
              : new Date(cur?.Date).getMinutes();
          const seconds =
            new Date(cur?.Date).getSeconds() < 10
              ? new Date(cur?.Date).getSeconds() + "0"
              : new Date(cur?.Date).getSeconds();
          if (acc.includes(`${hour}:${minute}:${seconds}`)) {
          } else {
            acc.push(`${hour}:${minute}:${seconds}`);
          }

          return acc;
        },
        [] as any
      );

      if (labelsData) setZengwenReservoirLabels(labelsData);
    }
  }, [ZengwenReservoirData, ZengwenReservoirTotalData]);

  //組 datasets
  useEffect(() => {
    const resultDatasets = ZengwenReservoirData?.responseData.map((item) => {
      return item?.EffectiveWaterStorageCapacity;
    });

    setWaterLevelData(resultDatasets);
  }, [ZengwenReservoirData]);

  // 資料變動更新要傳到線圖的資料
  useEffect(() => {
    setBarChartData({
      labels: zengwenReservoirLabels,
      datasets: [
        {
          label: "曾文水庫即時水位",
          data: waterLevelData,
          borderWidth: 1,
          backgroundColor: "skyblue",
        },
      ],
    });
    setBarChartOptions({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });
  }, [zengwenReservoirLabels, waterLevelData]);

  return (
    <ZengwenReservoirContainer>
      {ZengwenReservoirTotalData.isLoading ? (
        <div>loading</div>
      ) : (
        <>
          <div className="remind-text">資料每小時更新</div>
          <Bar options={barChartOptions} data={barChartData} />
        </>
      )}
    </ZengwenReservoirContainer>
  );
};

export default ZengwenReservoirChart;
