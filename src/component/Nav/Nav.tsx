import styled from "styled-components";
import { device } from "../../style/device";

const NavContainer = styled.nav`
  background-color: rgba(138, 177, 134, 0.65);
  height: 100px;
  color: ${({ theme }) => theme.color.textColor};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 70px;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;

  @media ${device.mobileL} {
    padding: 15px;
  }

  .primary-title {
    font-size: 32px;
    font-weight: 500;
    letter-spacing: 5px;
  }
  .second-title {
    padding-top: 15px;
    font-size: 15px;
  }
`;

const Nav = () => {
  return (
    <NavContainer>
      <div className="primary-title">
        農產品交易行情查詢
        <div className="second-title">
          農產品、漁產品、毛豬、家禽交易行情查詢
        </div>
      </div>
      <div>{/* <div>還不知道放什麼</div> */}</div>
    </NavContainer>
  );
};

export default Nav;
