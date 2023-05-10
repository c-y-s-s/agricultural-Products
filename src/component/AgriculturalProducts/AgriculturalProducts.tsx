import { useGetAgriculturalDataQuery } from "../../api/agriculturalProductsApi";
import Select from "react-select";

import { useEffect, useState } from "react";
import * as Styles from "./style";
import dayjs, { Dayjs } from "dayjs";

import { useDispatch } from "react-redux";
import { setDate } from "../../reducers/AgriculturalProductsController";
import ProductTable from "../ProductTable/ProductTable";
import SelectDate from "./SelectDate";
import ReactLoading from "react-loading";
interface SelectMarketNameType {
  value: string;
  label: string;
}

interface ResultAgriculturalTotalData {
  Avg_Price: number;
  CropCode: string;
  CropName: string;
  Lower_Price: number;
  MarketCode: string;
  MarketName: string;
  Middle_Price: number;
  TransDate: string;
  Trans_Quantity: number;
  Upper_Price: number;
  priceDifference?: string;
}

const AgriculturalProducts = () => {
  const dispatch = useDispatch();
  const dateData: Dayjs = dayjs();
  //  market label data
  const options = [
    { value: "台北一", label: "台北一" },
    { value: "台北二", label: "台北二" },
    { value: "板橋區", label: "板橋區" },
    { value: "三重區", label: "三重區" },
    { value: "宜蘭市", label: "宜蘭市" },
    { value: "桃農", label: "桃農" },
    { value: "台中市", label: "豐原區" },
    { value: "永靖鄉", label: "永靖鄉" },
    { value: "溪湖鎮", label: "溪湖鎮" },
    { value: "南投市", label: "南投市" },
    { value: "西螺鎮", label: "西螺鎮" },
    { value: "高雄市", label: "高雄市" },
    { value: "鳳山區", label: "鳳山區" },
    { value: "屏東市", label: "屏東市" },
    { value: "台東市", label: "台東市" },
    { value: "花蓮市", label: "花蓮市" },
  ];
  // 預設顯示台北二資料
  const [selectMarketName, setSelectMarketName] =
    useState<SelectMarketNameType>({
      value: "台北二",
      label: "台北二",
    });

  // 搜尋值
  const [searchText, setSearchText] = useState<string>("");
  // 日期值
  const [beforeDate, setBeforeDate] = useState<string>("");
  const [selectData, setSelectData] = useState<string>("");

  // 農產品 Api
  const AgriculturalTotalData: any = useGetAgriculturalDataQuery({
    startTime: beforeDate,
    endTime: selectData,
    marketName: selectMarketName.value,
  });

  const productTitleData = [
    "日期",
    "品名",
    "市場名稱",
    "上價",
    "中價",
    "下價",
    "平均價",
    "交易量",
    "漲跌幅",
    "線圖",
  ];
  // 為了不影響原陣列所以複製一個新的資料陣列
  const [agriculturalData, setAgriculturalData] = useState<
    ResultAgriculturalTotalData[]
  >(AgriculturalTotalData.data?.Data);

  // 與前一天比對價差百分比的邏輯
  const spreadPercentage = (): ResultAgriculturalTotalData[] => {
    const beforeData = AgriculturalTotalData?.data?.Data.filter(
      (item: ResultAgriculturalTotalData) => {
        return item.TransDate === beforeDate;
      }
    );
    const nowData = AgriculturalTotalData?.data?.Data?.filter(
      (item: ResultAgriculturalTotalData) => {
        return item.TransDate === selectData;
      }
    );

    const resultAgriculturalData = nowData?.map(
      (nowDataItem: ResultAgriculturalTotalData) => {
        const resultAvgPrice = beforeData.map(
          (beforeDataItem: ResultAgriculturalTotalData) => {
            if (nowDataItem.CropCode === beforeDataItem.CropCode) {
              // 價差
              const priceDifference: number = Number(
                (nowDataItem.Avg_Price - beforeDataItem.Avg_Price).toFixed(2)
              );

              // 漲跌幅
              const resultUpsAndDownsValue = (
                (priceDifference / beforeDataItem.Avg_Price) *
                100
              ).toFixed(2);

              return resultUpsAndDownsValue;
            }
          }
        );
        const filterResultAvgPrice = resultAvgPrice.filter(
          (item: string) => item !== undefined
        );

        return { ...nowDataItem, priceDifference: filterResultAvgPrice[0] };
      }
    );
    console.log(resultAgriculturalData);
    return resultAgriculturalData;
  };
  // 搜尋邏輯
  const handleProductSearch = (text: string) => {
    // 比對搜尋欄的字與 api 比對

    const resultAgriculturalData = spreadPercentage();

    const searchData = resultAgriculturalData?.filter(
      (item: ResultAgriculturalTotalData) => {
        return item.CropName.indexOf(text) === 0;
      }
    );

    setAgriculturalData(searchData);
  };

  // 初次渲染當天,後續交由 select 選的日期渲染
  useEffect(() => {
    // 判斷現在時間是否是早上7點,如果超過7點就用當天日期打api 如果不是就前一天

    const now: any =
      dateData?.hour() >= 7 ? dateData : dateData.subtract(1, "day");
    const year = now.$y - 1911;
    const month = now.$M + 1 < 10 ? "0" + (now.$M + 1) : now.$M + 1;
    const day = now.$D < 10 ? "0" + now.$D : now.$D;

    dispatch(setDate(`${year + 1911}/${month}/${day}`));
    setSelectData(`${year}.${month}.${day}`);

    const beforeDate: any =
      dateData?.hour() >= 7
        ? dayjs(dateData).subtract(1, "day")
        : dayjs(dateData).subtract(2, "day");
    const beforeOneYear: any = beforeDate && beforeDate?.$y - 1911;
    const beforeOneMonth =
      beforeDate.$M + 1 < 10 ? "0" + (beforeDate.$M + 1) : beforeDate.$M + 1;
    const beforeOneDay =
      beforeDate.$D < 10 ? "0" + beforeDate.$D : beforeDate.$D;

    setBeforeDate(`${beforeOneYear}.${beforeOneMonth}.${beforeOneDay}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //  與前一天比對價差
  useEffect(() => {
    const resultAgriculturalData = spreadPercentage();
    setAgriculturalData(resultAgriculturalData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [AgriculturalTotalData, beforeDate, selectData]);

  return (
    <Styles.AgriculturalProductsContainer>
      {AgriculturalTotalData.isLoading ? (
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
          <div className="agricultural-products-title">
            <div className="primary-title">
              農產品資訊
              <div className="primary-title-select-date">
                <SelectDate
                  setBeforeDate={setBeforeDate}
                  setSelectData={setSelectData}
                />
              </div>
            </div>
            <div className="right-block">
              <div className="right-block-select-date">
                <SelectDate
                  setBeforeDate={setBeforeDate}
                  setSelectData={setSelectData}
                />
              </div>

              <div className="market-name">
                <div>市場名稱</div>
                <div>
                  <Select
                    defaultValue={options[1]}
                    options={options}
                    className="market-select"
                    onChange={(option: SelectMarketNameType | null): void => {
                      if (option) setSelectMarketName(option);
                    }}
                  />
                </div>
              </div>

              <div className="search">
                <div className="search-button">搜尋農產品</div>
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value);
                    handleProductSearch(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
          <ProductTable
            productTitleData={productTitleData}
            ProductData={agriculturalData}
            renderType={"table"}
            selectData={selectData}
          />
        </>
      )}
    </Styles.AgriculturalProductsContainer>
  );
};

export default AgriculturalProducts;
