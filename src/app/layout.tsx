import "./globals.css";
import type { Metadata } from "next";
import {Web3Provider} from '../app/hooks/WebProvider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../app/components/Header";
import Footer from "../app/components/Footer";

export const metadata: Metadata = {
  title: "DFX NFT Mint App",
  description: "Blockchain for Creatives",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
         <ToastContainer
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
          <Web3Provider>
              <Header />
              <main className="min-h-screen" style={{backgroundImage: 'url(/grid-pattern.png)'}}>{children}</main>
              <Footer/>
          </Web3Provider>
      
      </body>
    </html>
  );
}
