import styled from "styled-components";

const FooterContainer = styled.div`
  background-color: #8ab186;
  width: 100%;
  color: #fff;
  text-align: center;
  padding: 30px 0px;
  margin-top: 30px;
  div {
    margin: 6px 0px;
  }
`;
const Footer = () => {
  return (
    <FooterContainer>
      <div>資料版權由OpenData開放資料服務平臺所有</div>
      <div>© 2023 - Leo Chang</div>
    </FooterContainer>
  );
};

export default Footer;
