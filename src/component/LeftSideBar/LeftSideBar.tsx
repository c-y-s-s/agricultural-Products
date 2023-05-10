import React from "react";
import styled from "styled-components";
import { device } from "../../style/device";

const LeftSideBarContainer = styled.div`
  border: 1px solid #ccc;
  min-width: 250px;
  margin: 50px;
  margin-right: 0px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  @media ${device.laptop} {
    min-width: 180px;
  }
  @media ${device.tablet} {
    display: none;
  }
  .menu {
    background-color: ${({ theme }) => theme.color.primaryColor};
    color: ${({ theme }) => theme.color.textColor};
    font-size: 26px;

    letter-spacing: 5px;
    border-radius: 20px 20px 0 0;
    height: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .menu-item {
    padding: 20px;
    font-size: 20px;
    color: #333333;

    li {
      margin: 40px 0;
    }
  }
`;

const LeftSideBar = () => {
  return (
    <LeftSideBarContainer>
      <div className="menu">選單</div>
      <ul className="menu-item">
        <li>農產品資訊</li>
        <li>肉</li>
        <li>農藥</li>
      </ul>
    </LeftSideBarContainer>
  );
};

export default LeftSideBar;
