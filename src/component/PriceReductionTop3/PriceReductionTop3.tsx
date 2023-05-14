import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetAgriculturalDataQuery } from "../../api/agriculturalProductsApi";
import dayjs, { Dayjs } from "dayjs";
import { device } from "../../style/device";

const PriceReductionTop3Container = styled.div`
  @media ${device.laptopL} {
    max-width: 400px;
  }
  @media ${device.laptop} {
    max-width: 300px;
    height: 250px;
  }

  .lottery-container {
    color: ${({ theme }) => theme.color.primaryTextColor};
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0px 15px;

    @media ${device.laptop} {
      margin-top: 50px;
    }
    @media ${device.tablet} {
      margin-top: 12px;
      display: block;
      text-align: center;
    }
    .product-img {
      max-width: 200px;
      min-width: 200px;
      height: 200px;
      border-radius: 50%;
      margin-right: 20px;
      object-fit: cover;
      @media ${device.laptop} {
        max-width: 100px;
        min-width: 100px;
        height: 100px;
      }
      @media ${device.tablet} {
        margin-right: 0px;
      }
    }

    .lottery-content {
      div {
        margin: 18px 0;
        @media ${device.tablet} {
          margin: 8px 0;
        }
      }
      .lotto-title {
        font-size: 22px;
      }
    }
  }
  .second-content {
    width: 100%;
    display: flex;
    border-radius: 0px 0 15px 15px;
    background-color: #2e3336;
    color: #c5cdcf;
    width: 100%;
    min-height: 80px;
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    @media ${device.laptop} {
      text-align: center;
    }
    @media ${device.tablet} {
      display: block;
    }
    .second-title {
      @media ${device.tablet} {
        font-size: 16px;
      }
    }
    .second-text {
      font-size: 14px;
      margin-top: 7px;
      @media ${device.tablet} {
        font-size: 10px;
      }
    }

    .second-button {
      padding: 8px;
      background-color: ${({ theme }) => theme.color.primaryColor};
      color: ${({ theme }) => theme.color.textColor};
      margin-left: 24px;
      border-radius: 5px;
      @media ${device.laptop} {
        margin-left: 0px;
      }
      @media ${device.tablet} {
        font-size: 16px;
        margin-top: 6px;
      }
    }
  }
`;
const PriceReductionTop3 = () => {
  const agriculturalTotalData: any = useGetAgriculturalDataQuery({
    startTime: "112.05.14",
    endTime: "112.05.14",
    marketName: "台北二",
  });
  const [agriculturalData, setAgriculturalData] = useState<any>("");
  const [productImgNum, setProductImgNum] = useState<number>(1);
  const [resultLottoData, setResultLottoData] = useState<any>();
  const handleLottoStart = () => {
    let lottoData: any = {};
    let intervalId = setInterval(function () {
      let num = Math.floor(Math.random() * agriculturalData?.length) - 1;
      lottoData = agriculturalData[num];

      setProductImgNum(Math.floor(Math.random() * 5));
      setResultLottoData(lottoData);
    }, 100);

    setTimeout(function () {
      clearInterval(intervalId);

      setResultLottoData(lottoData);
    }, 3000);
  };

  useEffect(() => {
    const resultData = agriculturalTotalData?.data?.Data?.map((item: any) => {
      return {
        cropName: item.CropName,
        marketName: item.MarketName,
        avgPrice: item.Avg_Price,
      };
    });

    setAgriculturalData(resultData);
  }, [agriculturalTotalData]);

  useEffect(() => {
    if (agriculturalData) handleLottoStart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agriculturalData]);
  return (
    <PriceReductionTop3Container>
      <div className="lottery-container">
        <img
          className="product-img"
          src={require(`../../image/product${productImgNum}.jpg`)}
          alt=""
        />

        <div className="lottery-content">
          <div className="lotto-title">{resultLottoData?.cropName}</div>
          <div className="lotto-market-name">
            市場 : {resultLottoData?.marketName}
          </div>
          <div className="lotto-price-avg">
            平均價 : {resultLottoData?.avgPrice}
          </div>
        </div>
      </div>

      <div className="second-content">
        <div className="second-title">
          今日幸運蔬果
          <div className="second-text">不知道今天吃什麼嗎，我來幫你選。</div>
        </div>

        <button className="second-button" onClick={handleLottoStart}>
          點我
        </button>
      </div>
    </PriceReductionTop3Container>
  );
};

export default PriceReductionTop3;
