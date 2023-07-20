import { styled } from "styled-components";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 20px;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .logo {
    font-size: 18px;
    font-weight: bold;
  }

  .copyright {
    margin-top: 10px;
    font-size: 14px;
  }

  @media (max-width: 767px) {
    .content {
      flex-direction: column;
      align-items: center;
    }
    .logo {
      margin-bottom: 10px;
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer className="footer">
      <div className="content">
        <div className="logo">Ra Games</div>
      </div>
      <div className="copyright">© 2023 Ra Games. All rights reserved</div>
    </FooterContainer>
  );
}
