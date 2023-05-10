import styled from "styled-components";
import { device } from "../../style/device";

export const TableContainer = styled.div<any>`
  .agricultural-products-table {
    padding: 0px 20px 20px 20px;
    overflow: hidden auto;
    height: calc(100vh - 109px);
    @media ${device.tablet} {
      text-align: center;
    }

    @media ${device.mobileL} {
      height: calc(100vh - 420px);
    }

    .close-market {
      justify-content: center;
      color: #333;
      font-size: 30px;
      align-items: center;
      height: 300px;
    }
    li {
      color: ${({ theme }) => theme.color.primaryTextColor};
      border-radius: 5px;
      padding: 15px 10px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
      @media ${device.mobileL} {
        padding: 6px 0px;
      }
      & > div {
        flex-basis: 12%;
        margin-left: 10px;
        @media ${device.laptop} {
          margin-left: 4px;
        }
        @media ${device.mobileL} {
          font-size: 12px;
        }
        .second-text {
          font-size: 8px;
        }
      }
    }

    .table-header {
      background-color: ${({ theme }) => theme.color.primaryColor};
      color: ${({ theme }) => theme.color.textColor};
      font-size: 15px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.03em;

      position: ${(props) =>
        props.renderType === "table" ? "sticky" : "static"};
      top: 0px;
      /* @media ${device.tablet} {
        top: 130px;
      }
      @media ${device.mobileL} {
        top: 230px;
        font-size: 12px;
      }
      @media ${device.mobileM} {
        top: 230px;
      } */
    }
    .table-row {
      background-color: #ffffff;
      box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.1);
      align-items: center;

      .mobile-trans-Date {
        display: none;
        @media ${device.mobileM} {
          display: block;
        }
      }

      .desktop-trans-Date {
        @media ${device.mobileM} {
          display: none;
        }
      }

      .go-chart {
        margin-left: 0px;
        text-align: right;
        cursor: pointer;
        div {
          width: 60px;
          padding: 12px;
          background-color: ${({ theme }) => theme.color.primaryColor};
          text-align: center;
          border-radius: 6px;
          color: #fff;
          @media ${device.mobileL} {
            text-align: center;
            width: 30px;
            font-size: 12px;
            padding: 6px;
          }
        }
      }
    }
  }
`;
