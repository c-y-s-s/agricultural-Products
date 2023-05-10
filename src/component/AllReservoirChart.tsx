import React, { useEffect, useState } from "react";
import { useGetAllReservoirDataQuery } from "../api/reservoirApi";
import { Doughnut } from "react-chartjs-2";

const AllReservoirChart = () => {
  const allReservoirTotalData = useGetAllReservoirDataQuery();

  const allReservoirData = allReservoirTotalData.data;

  const [labels, sesLabels] = useState<any>("");
  const [TotalDatasets, setTotalDatasets] = useState<any>("");
  const [dataBackground, setDataBackGround] = useState<any>("");
  // 組 labels
  useEffect(() => {
    if (!allReservoirData) return;
    const resultLabels = allReservoirData?.responseData?.map((item) => {
      return item.ReservoirName;
    });

    sesLabels(resultLabels);
  }, [allReservoirData]);

  // 組 datasets,setDatasets
  useEffect(() => {
    if (!allReservoirData) return;
    const resultData = allReservoirData?.responseData?.map((item) => {
      return item.EffectiveCapacity;
    });
    setTotalDatasets(resultData);
  }, [allReservoirData]);

  //組背景色
  useEffect(() => {
    const generateUniqueColors = () => {
      if (allReservoirData) {
        let colors = [];

        for (let i = 0; i < allReservoirData?.responseData?.length; i++) {
          let color = "#";
          for (let j = 0; j < 6; j++) {
            color += Math.floor(Math.random() * 16).toString(16);
          }

          if (colors.indexOf(color) === -1) {
            colors.push(color);
          } else {
            i--;
          }
        }

        return colors;
      }
    };

    setDataBackGround(generateUniqueColors());
  }, [allReservoirData]);
  return (
    <div>
      <Doughnut
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "全台水庫有效容量",
            },
          },
          //   cutout: "50%",
        }}
        data={{
          labels: labels,
          datasets: [
            {
              label: "容量",
              data: TotalDatasets,
              borderWidth: 1,
              backgroundColor: dataBackground,
            },
          ],
        }}
      />
    </div>
  );
};

export default AllReservoirChart;
