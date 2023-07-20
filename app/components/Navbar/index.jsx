"use client";

import Link from "next/link";
import { styled } from "styled-components";

const NavbarContainer = styled.div`
  background-color: #333;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999; // чтобы карточки не перекрывали

  a {
    font-size: 24px;
    margin-right: auto;
    padding: 0 20px;
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    letter-spacing: 2px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    text-align: center;

    a {
      text-align: center;
      margin: 0;
    }
  }
`;

export default function Navbar() {
  return (
    <NavbarContainer>
      <Link href="/">Ra Games</Link>
    </NavbarContainer>
  );
}
