import { Chart as ChartJS, registerables } from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import styled from "styled-components";
import { RootState } from "../../reducers";
import { useSelector } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { useGetAgriculturalChartDataQuery } from "../../api/agriculturalProductsApi";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactLoading from "react-loading";
import * as Styles from "./style";
import ProductTable from "../ProductTable/ProductTable";
import { setComponentToggle } from "../../reducers/AgriculturalProductsController";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
const AgriculturalProductsChart = () => {
  ChartJS.register(...registerables);

  const dispatch = useDispatch();

  const cropName = useSelector(
    (state: RootState) =>
      state.AgriculturalProductsControllerSliceReducer.cropName
  );

  const cropCode = useSelector(
    (state: RootState) =>
      state.AgriculturalProductsControllerSliceReducer.cropCode
  );
  const selectDate = useSelector(
    (state: RootState) =>
      state.AgriculturalProductsControllerSliceReducer.selectDate
  );
  const marketName = useSelector(
    (state: RootState) =>
      state.AgriculturalProductsControllerSliceReducer.marketName
  );

  const [timeData, setTimeData] = useState<any>({
    startTime: "",
    endTime: "",
  });
  const chartTotalData = useGetAgriculturalChartDataQuery({
    startTime: timeData.startTime,
    endTime: timeData.endTime,
    CropCode: cropCode,
    marketName: marketName,
  });

  const [chartData, setChartData] = useState(chartTotalData?.data?.Data);
  const [labelsData, setLabelsData] = useState<string[]>([]);
  const [resultDatasets, setResultDatasets] = useState<any>([]);
  const [resultTransQuantityData, setResultTransQuantityData] = useState<[]>(
    []
  );

  const productTitleData = [
    "日期",
    "品名",
    "市場名稱",
    "上價",
    "中價",
    "下價",
    "平均價",
    "交易量",
  ];

  //組 labels
  useEffect(() => {
    const labelData = chartData?.map((item) => {
      return item.TransDate;
    });
    if (labelData) setLabelsData(labelData);
  }, [chartData]);

  // 組圖表的 dataset
  useEffect(() => {
    const dataCombination: any = {
      UpperPriceData: [],
      MiddlePriceData: [],
      LowerPriceData: [],
      AvgPriceData: [],
    };
    const TransQuantityData: any = [];
    chartData?.map((item: any) => {
      dataCombination.UpperPriceData.push(item.Upper_Price);
      dataCombination.MiddlePriceData.push(item.Middle_Price);
      dataCombination.LowerPriceData.push(item.Lower_Price);
      dataCombination.AvgPriceData.push(item.Avg_Price);
      TransQuantityData.push(item.Trans_Quantity);
    });

    const resultData = Object?.keys(dataCombination).map((item) => {
      let LineColor: string = "";
      let labelName: string = "";

      switch (item) {
        case "UpperPriceData":
          labelName = "上價";
          LineColor = "#4A7056";
          break;
        case "MiddlePriceData":
          labelName = "中價";
          LineColor = "#BFADA1";
          break;
        case "LowerPriceData":
          labelName = "下價";
          LineColor = "#88807D";
          break;
        case "AvgPriceData":
          labelName = "平均價";
          LineColor = "#4069da";
          break;
        default:
          break;
      }
      return {
        label: labelName,
        data: dataCombination[item],
        fill: false,
        backgroundColor: LineColor,
        borderColor: LineColor,
        tension: 0.1,
      };
    });

    setResultDatasets(resultData);
    setResultTransQuantityData(TransQuantityData);
  }, [chartData]);

  // 反轉資料順序才符合圖表資料要的
  useEffect(() => {
    if (chartTotalData?.data?.Data) {
      setChartData([...chartTotalData?.data?.Data].reverse());
    }
  }, [chartTotalData, chartTotalData?.data?.Data]);

  useEffect(() => {
    if (selectDate) {
      const year = dayjs(selectDate).format(`YYYY`);

      const startTime = dayjs(selectDate)
        .subtract(7, "day")
        .format(`${Number(year) - 1911}.MM.DD`);

      const endTime = dayjs(selectDate).format(`${Number(year) - 1911}.MM.DD`);

      setTimeData({ endTime: endTime, startTime: startTime });
    }
  }, [selectDate]);
  return (
    <Styles.LineContainer>
      {chartTotalData.isLoading ? (
        <div className="loading-container">
          <ReactLoading
            type={"spin"}
            color="#478058"
            height={"80px"}
            width={"80px"}
            className={"loading"}
          />
          <div>資料快好了...</div>
        </div>
      ) : (
        <>
          <div
            className="back-to-list-button"
            onClick={() => {
              dispatch(setComponentToggle("table"));
            }}
          >
            回農產品總覽清單
          </div>
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: cropName + " - 近日價格線圖",
                },
              },
              maintainAspectRatio: false,
            }}
            data={{
              labels: labelsData,
              datasets: resultDatasets,
            }}
          />
          <Bar
            className="bar"
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
            data={{
              labels: labelsData,
              datasets: [
                {
                  label: cropName + " - 近日交易量",
                  data: resultTransQuantityData,
                  borderWidth: 1,
                  backgroundColor: "#478058",
                },
              ],
            }}
          />
          <ProductTable
            productTitleData={productTitleData}
            ProductData={chartData}
            renderType={"chart"}
          />
        </>
      )}
    </Styles.LineContainer>
  );
};

export default AgriculturalProductsChart;
