"use client";

import { styled } from "styled-components";
import Footer from "../Footer";
import Navbar from "../Navbar";

const Content = styled.div`
  padding: 0 2rem;
  margin-top: 50px;
  margin-bottom: 60px;
  min-height: 100%;

  @media (max-width: 768px) {
    padding: 0;
  }
`;

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
