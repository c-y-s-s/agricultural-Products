import styled from "styled-components";
import { device } from "../../style/device";

export const AgriculturalProductsContainer = styled.div`
  overflow: hidden;
  /* overflow-y: auto; */
  height: calc(100vh - 200px);

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .agricultural-products-title {
    background-color: #fff;
    display: flex;
    padding: 25px;
    padding-bottom: 20px;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.color.primaryTextColor};
    position: sticky;
    top: 0;
    z-index: 1;
    @media ${device.laptop} {
      display: block;
    }
    @media ${device.mobileL} {
      padding: 15px 30px;
    }

    @media ${device.mobileM} {
      padding-top: 5px;
    }

    .primary-title {
      font-size: 22px;
      @media ${device.mobileL} {
        display: flex;
        align-items: center;
      }

      @media ${device.mobileM} {
        margin-top: 5px;
      }
      .primary-title-select-date {
        @media ${device.desktopL} {
          display: none;
        }
        @media ${device.mobileL} {
          display: block;
        }
      }
    }
    .right-block {
      display: flex;
      justify-content: center;
      @media ${device.laptop} {
        justify-content: start;
      }
      @media ${device.mobileL} {
        display: block;
        margin-top: 20px;
      }
      .right-block-select-date {
        @media ${device.mobileL} {
          display: none;
        }
      }
      .market-name {
        border: 1px solid #ccc;
        padding: 10px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        margin: 0px 12px;
        @media ${device.mobileL} {
          display: block;
          padding: 0;
          margin: 0;
          font-size: 10px;
          border: none;
        }

        .market-select {
          margin-left: 6px;
          width: 100%;
          @media ${device.mobileL} {
            margin-top: 6px;
          }
        }
      }
      .search {
        color: ${({ theme }) => theme.color.primaryTextColor};
        border: 1px solid #ccc;
        padding: 10px;
        min-height: 60px;
        border-radius: 12px;
        display: flex;

        align-items: center;
        justify-content: center;
        @media ${device.mobileL} {
          display: block;
          padding: 0;
          margin: 0;
          font-size: 10px;
          border: none;
        }
        input {
          border: 1px solid #ccc;
          padding: 8px;
          margin-left: 6px;
          @media ${device.laptop} {
            width: 100%;
            @media ${device.mobileL} {
              margin-top: 6px;
            }
          }
        }
      }
    }
  }
`;

export const SelectDateContainer = styled.div`
  .select-date {
    color: ${({ theme }) => theme.color.primaryTextColor};
    display: flex;
    align-items: center;
    justify-content: center;
    @media ${device.mobileL} {
      display: block;
      display: none;
    }

    .css-1xhypcz-MuiStack-root {
      padding-top: 0;
    }

    .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root {
      border-radius: 12px;
      min-height: 60px;
      width: 180px;
    }
    .date-picker {
      margin-left: 6px;
    }
  }
`;
