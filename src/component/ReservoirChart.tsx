import { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { useGetReservoirDataQuery } from "../api/reservoirApi";
import styled from "styled-components";
import dayjs from "dayjs";
ChartJS.register(...registerables);

interface ChartDatasetsType {
  label: string;
  data: string[];
  borderColor: string;
  fill: boolean;
  cubicInterpolationMode: string;
  tension: number;
}
interface ChartDataType {
  labels: string[];
  datasets: ChartDatasetsType[] | any;
}

const LineContainer = styled.div``;
function ReservoirChart() {
  // 石門水庫 API
  const { data: reservoirData } = useGetReservoirDataQuery();
  // const reservoirData = reservoirTotalData.data;

  const [labels, setLabels] = useState<string[]>([]);
  const [chartDatasets, setChartDatasets] = useState<ChartDatasetsType[]>([]);

  const [chartData, setChartData] = useState<ChartDataType>({
    labels: labels,
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  // 組 datasets
  useEffect(() => {
    if (reservoirData) {
      // 資料按照 MonitorLocation 分類資料
      const dataCategory = reservoirData?.responseData?.reduce(
        (acc, cur): any => {
          acc[cur?.MonitorLocation] = acc[cur?.MonitorLocation] || [];

          acc[cur?.MonitorLocation].push(cur);
          return acc;
        },
        {} as any
      );

      if (dataCategory) {
        // 根據分類的 object key 重組成 chart 需要的資料格式

        const datasetsResult = Object?.keys(dataCategory)?.map((item) => {
          
          const turbidityResult = dataCategory[item]?.map((item: any) => {
            return item.Turbidity;
          });

          let borderColor: string = "";

          // 根據分類去改線條色
          if (item === "GP17") borderColor = "rgb(64, 67, 233)";
          if (item === "NW12") borderColor = "rgb(152, 60, 233)";
          if (item === "NX08") borderColor = "rgb(225, 47, 133)";

          return {
            backgroundColor: borderColor,
            label: item,
            data: turbidityResult,
            borderColor,
            fill: false,
            cubicInterpolationMode: "monotone",
            tension: 1.5,
          };
        });

        if (datasetsResult) setChartDatasets(datasetsResult);
      }
    }
  }, [reservoirData]);

  // 組 label
  useEffect(() => {
    if (reservoirData) {
      // label 需要呈現的時間格式
      const labelsData = reservoirData?.responseData?.reduce((acc, cur) => {
        const hour = dayjs(cur?.MonitorDate).format("HH");
        const minute = dayjs(cur?.MonitorDate).format("mm");
        const seconds = dayjs(cur?.MonitorDate).format("ss");

        if (acc.includes(`${hour}:${minute}:${seconds}`)) {
        } else {
          acc.push(`${hour}:${minute}:${seconds}`);
        }
        return acc;
      }, [] as any);

      if (labelsData) setLabels(labelsData);
    }
  }, [reservoirData]);

  useEffect(() => {
    if (chartDatasets.length > 0) {
      setChartData({
        labels: labels,
        datasets: chartDatasets,
      });
    }
    setChartOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: false,
          text: "石門水庫混濁度",
        },
      },
    });
  }, [chartDatasets, labels]);

  return (
    <LineContainer>
      <Line options={chartOptions} data={chartData} />
    </LineContainer>
  );
}

export default ReservoirChart;
