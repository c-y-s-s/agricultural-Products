import React, { FC } from "react";
import {
  setComponentToggle,
  setCropCode,
  setMarketName,
  setCropName,
} from "../../reducers/AgriculturalProductsController";
import dayjs, { Dayjs } from "dayjs";
import * as Styles from "./style";
import { useDispatch } from "react-redux";
import ReactLoading from "react-loading";
const ProductTable: FC<any> = ({
  productTitleData,
  ProductData,
  renderType,
  selectData,
  status,
}) => {
  const dispatch = useDispatch();

  const productListJSX = () => {
    if (ProductData?.length > 0 && renderType === "table") {
      return ProductData?.map((item: any) => {
        return (
          item.TransDate === selectData && (
            <li className="table-row" key={item.CropCode}>
              <div>
                <div className="mobile-trans-Date">
                  {dayjs(selectData).format("MM.DD")}
                </div>
                <div className="desktop-trans-Date"> {item.TransDate}</div>
              </div>
              <div>{item.CropName}</div>
              <div>{item.MarketName}</div>
              <div>{item.Upper_Price}</div>
              <div>{item.Middle_Price}</div>
              <div>{item.Lower_Price}</div>
              <div>{item.Avg_Price}</div>
              <div>{item.Trans_Quantity}</div>
              <div>
                {item.priceDifference === undefined
                  ? "0%"
                  : item.priceDifference + "%"}
              </div>
              <div
                className="go-chart"
                onClick={() => {
                  dispatch(setComponentToggle("chart"));
                  dispatch(setCropCode(item?.CropCode));
                  dispatch(setMarketName(item?.MarketName));
                  dispatch(setCropName(item?.CropName));
                }}
              >
                <div>進入</div>
              </div>
            </li>
          )
        );
      });
    } else if (status === "pending") {
      return (
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
      );
    } else if (status === "fulfilled") {
      return <li className="close-market">本日休市</li>;
    }
  };
  return (
    <Styles.TableContainer renderType={renderType}>
      <ul className="agricultural-products-table">
        <li className="table-header">
          {productTitleData.map((item: any) => {
            return <div key={item}>{item}</div>;
          })}
        </li>

        {/* 這是清單用的表格 */}
        {productListJSX()}
        {/* 這是圖表用的表格 */}
        {ProductData &&
          renderType === "chart" &&
          ProductData?.map((item: any) => {
            return (
              <li className="table-row" key={item.TransDate}>
                <div>{item.TransDate}</div>
                <div>{item.CropName}</div>
                <div>{item.MarketName}</div>
                <div>{item.Upper_Price}</div>
                <div>{item.Middle_Price}</div>
                <div>{item.Lower_Price}</div>
                <div>{item.Avg_Price}</div>
                <div>{item.Trans_Quantity}</div>
              </li>
            );
          })}
      </ul>
    </Styles.TableContainer>
  );
};

export default ProductTable;
