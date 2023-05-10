import styled from "styled-components";
import { device } from "../../style/device";

const LineContainer = styled.div`
  height: 100%;
  padding: 70px;

  overflow: hidden auto;
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media ${device.mobileL} {
    padding: 15px;
  }
  .back-to-list-button {
    width: 200px;
    padding: 12px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.color.primaryColor};
    text-align: center;
    border-radius: 6px;
    color: #fff;

    position: sticky;
    top: 0;
  }
`;

export { LineContainer };
