import styled from "styled-components";

import LeftSideBar from "./component/LeftSideBar/LeftSideBar";
import AgriculturalProducts from "./component/AgriculturalProducts/AgriculturalProducts";
import Nav from "./component/Nav/Nav";
import { useSelector } from "react-redux";
import { RootState } from "./reducers";
import AgriculturalProductsChart from "./component/AgriculturalProductsChart/AgriculturalProductsChart";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Weather from "./component/Weather/Weather";
import Rainfall from "./component/Rainfall/Rainfall";
import PriceReductionTop3 from "./component/PriceReductionTop3/PriceReductionTop3";
import { device } from "./style/device";
import Footer from "./component/Footer/Footer";

const PrimaryText = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  max-width: 1550px;
  margin: auto;
  @media ${device.tablet} {
    height: calc(100vh - 150px);
  }
  @media ${device.tablet} {
    height: calc(100vh - 200px);
  }
`;

const DataRenderBlock = styled.div`
  min-width: 930px;
  width: 100%;
  margin: 50px;
  margin-left: 25px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  overflow: hidden;
  /* overflow-y: auto; */
  @media ${device.laptop} {
    min-width: 580px;
  }
  @media ${device.tablet} {
    margin: 18px 32px;
  }
  @media ${device.mobileL} {
    max-width: 400px;
    min-width: 400px;
    margin: 0 12px;
  }
  @media ${device.mobileM} {
    max-width: 365px;
    min-width: 365px;
    margin: 0 6px;
  }
`;

const CarouselImg = styled.img`
  height: 380px;
  object-fit: cover;
`;

const OtherDataCard = styled.div`
  display: flex;
  max-width: 1550px;
  margin: auto;
  padding: 50px 50px 0px 50px;
  justify-content: space-around;
  align-items: center;
  @media ${device.laptop} {
    padding: 50px 25px 0px 25px;
  }
  @media ${device.mobileL} {
    display: block;
    padding: 0 15px;
  }
  > div {
    flex: 1;
    border-radius: 15px;
    max-width: 450px;
    min-height: 300px;
    max-height: 300px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0px 6px;
    @media ${device.tablet} {
      max-width: 220px;
    }
    @media ${device.mobileL} {
      max-width: 100%;
      padding: 0px;
      margin: 20px 0px;
    }
  }
`;
function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <CarouselImg
          className="d-block w-100 carousel-img "
          src={require("./image/pexels-alejandro-barrón-96715.jpg")}
          alt="First slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImg
          className="d-block w-100 "
          src={require("./image/pexels-elizabeth-tr-armstrong-635705 (1).jpg")}
          alt="Second slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <CarouselImg
          className="d-block w-100 "
          src={require("./image/pexels-ryan-baker-129574 (1).jpg")}
          alt="Third slide"
        />

        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

function App() {
  const AgriculturalProductsToggle = useSelector(
    (state: RootState) =>
      state.AgriculturalProductsControllerSliceReducer.toggleComponent
  );

  // 農場品渲染元件切換
  const AgriculturalProductsRender = () => {
    switch (AgriculturalProductsToggle) {
      case "table":
        return <AgriculturalProducts />;
      case "chart":
        return <AgriculturalProductsChart />;

      default:
        break;
    }
  };
  return (
    <div>
      <Nav />
      <UncontrolledExample />
      <OtherDataCard>
        <Weather />
        <Rainfall />
        <PriceReductionTop3 />
      </OtherDataCard>
      <PrimaryText>
        <DataRenderBlock>{AgriculturalProductsRender()}</DataRenderBlock>
      </PrimaryText>
      <Footer />
    </div>
  );
}

export default App;
