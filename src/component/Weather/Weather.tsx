import styled from "styled-components";
import { useGetWeatherDataQuery } from "../../api/weatherAPI";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { ReactComponent as WeatherImg } from "../../image/group1.svg";
import { device } from "../../style/device";
const WeatherContainer = styled.div`
  @media ${device.laptopL} {
    max-width: 400px;
  }
  @media ${device.laptop} {
    max-width: 300px;
    height: 250px;
  }
  .main-image {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    svg {
      height: 200px;
      width: 200px;
    }
  }
  .second-content {
    display: flex;
    .weather-content {
      border-radius: 0px 0 0 15px;
      background-color: #2e3336;
      display: flex;
      color: #c5cdcf;
      width: 100%;
      height: 80px;
      align-items: center;
      @media ${device.laptop} {
        text-align: center;
        padding-top: 11px;
        display: block;
      }
      .temperature {
        font-size: 35px;
        letter-spacing: 1px;
        margin-left: 35px;
        @media ${device.laptop} {
          margin-left: 0px;
          text-align: center;
        }
        @media ${device.tablet} {
          font-size: 16px;
        }
      }
      .weather-description {
        margin-left: 12px;
        @media ${device.laptop} {
          display: flex;
          align-items: center;
          margin-top: 6px;
          text-align: center;
          margin-left: 0px;
          justify-content: center;
        }
        @media ${device.tablet} {
          display: block;
        }
        .wx-text {
          font-size: 20px;
          letter-spacing: 4px;
          @media ${device.tablet} {
            font-size: 16px;
            margin: 3px 0;
          }
        }
        .city {
          margin-top: 8px;
          font-size: 16px;
          @media ${device.laptop} {
            margin-top: 0px;
          }
        }
      }
    }
  }
  .weather-date {
    border-radius: 0 0px 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 150px;
    background-color: ${({ theme }) => theme.color.primaryColor};
    color: #fff;
    .month {
    }
    .day {
      margin-top: 5px;
      font-size: 30px;
    }
  }
`;
const Weather = () => {
  const nowDate: any = dayjs();

  const weatherTotalData = useGetWeatherDataQuery({
    cityName: "臺北市",
    Date: dayjs().format("YYYY-MM-DDTHH"),
  });

  const [weatherData, setWeatherData] = useState<any>();

  useEffect(() => {
    if (weatherTotalData) {
      const wx =
        weatherTotalData?.currentData?.records?.location[0].weatherElement[0]
          .time[0].parameter.parameterName;
      const maxT =
        weatherTotalData?.currentData?.records?.location[0].weatherElement[4]
          .time[0].parameter.parameterName;
      const minT =
        weatherTotalData?.currentData?.records?.location[0].weatherElement[2]
          .time[0].parameter.parameterName;
      const city =
        weatherTotalData?.currentData?.records?.location[0].locationName;
      setWeatherData({
        wx,
        maxT,
        minT,
        city,
      });
    }
  }, [weatherTotalData]);
  return (
    <WeatherContainer>
      <div className="main-image">
        <WeatherImg />
      </div>

      <div className="second-content">
        <div className="weather-content">
          <div className="temperature">
            {weatherData?.minT}&deg;~{weatherData?.maxT}&deg;
          </div>
          <div className="weather-description">
            <div className="wx-text">{weatherData?.wx}</div>
            <div className="city">{weatherData?.city}</div>
          </div>
        </div>

        <div className="weather-date">
          <div className="month">
            {dayjs().format("MMM").toLocaleUpperCase()}
          </div>
          <div className="day">{nowDate?.$D}</div>
        </div>
      </div>
    </WeatherContainer>
  );
};

export default Weather;
