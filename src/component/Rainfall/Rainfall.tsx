import styled from "styled-components";
import dayjs from "dayjs";
import { useGetRainfallDataQuery } from "../../api/agriculturalProductsApi";
import { useEffect, useState } from "react";
import { device } from "../../style/device";
import ReactLoading from "react-loading";

const RainfallContainer = styled.div`
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media ${device.laptopL} {
    max-width: 400px;
  }
  @media ${device.laptop} {
    max-width: 300px;
    height: 250px;
  }
  .time {
    color: ${({ theme }) => theme.color.primaryTextColor};
    font-size: 10px;
    padding: 6px 0 0 6px;
  }
  .rainfall-text {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 150px;
    color: #8592a2;

    @media ${device.laptop} {
      font-size: 125px;
    }
    .second-text {
      font-size: 30px;

      display: flex;
      align-items: end;
      height: 100%;
      padding-bottom: 30px;
    }
  }
  .second-content {
    width: 100%;
    display: flex;

    .city {
      border-radius: 0px 0 15px 15px;
      background-color: #2e3336;
      color: #c5cdcf;
      width: 100%;
      height: 80px;
      font-size: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      @media ${device.tablet} {
        font-size: 18px;
      }
    }
    .rainfall-date {
      border-radius: 0 0px 15px 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 150px;
      background-color: ${({ theme }) => theme.color.primaryColor};
      color: #fff;

      .day {
        margin-top: 5px;
        font-size: 30px;
      }
    }
  }
`;

const Rainfall = () => {
  const rainfallTotalData = useGetRainfallDataQuery({
    time: dayjs().format("YYYY/MM/DD"),
  });

  const [rainfallData, setRainFallData] = useState<any>("");

  useEffect(() => {
    if (rainfallTotalData) {
      const resultData = rainfallTotalData?.data?.Data[0];
      setRainFallData({
        time: resultData?.TIME,
        city: resultData?.CITY,
        rainfall: resultData?.NOW,
      });
    }
  }, [rainfallTotalData]);

  return (
    <RainfallContainer>
      {rainfallTotalData.isLoading ? (
        <>
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
        </>
      ) : (
        <>
          {" "}
          <div className="time">{rainfallData.time}</div>
          <div className="rainfall-text">
            {rainfallData.rainfall}
            <div className="second-text">mm</div>
          </div>
          <div className="second-content">
            <div className="city">{rainfallData.city} - 本日累積雨量</div>
          </div>
        </>
      )}
    </RainfallContainer>
  );
};

export default Rainfall;
