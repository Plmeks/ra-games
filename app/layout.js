import { Inter } from "next/font/google";
import Layout from "./components/Layout";
import "./globals.css";
import ReactQueryProvider from "./lib/reactQueryProvider";
import StyledComponentsProvider from "./lib/styledComponentsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ra Games",
  description: "Ra games platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <StyledComponentsProvider>
          <body className={inter.className}>
            <Layout>{children}</Layout>
          </body>
        </StyledComponentsProvider>
      </ReactQueryProvider>
    </html>
  );
}
