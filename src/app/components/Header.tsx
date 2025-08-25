"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi"; 
import { toast } from 'react-toastify';
import  Button  from "../components/Button";
import Image from 'next/image';
import { useState } from "react";
import { Menu, X } from "lucide-react"; // icons
import { Web3 } from "web3";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
    // usestate for wallet connect and connected
  const { open } = useAppKit();
  const  notifyErrorMsg = (msg : string) => toast.error(msg);
  const  notifySuccess = (msg : string) => toast.success(msg);
  const { isConnected } = useAccount();

  interface EthereumProvider {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: (args: { method: string; params?: Array<any> }) => Promise<any>;
 }


     async function addCustomNetwork() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const ethereum = window.ethereum as unknown as EthereumProvider;
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x61", // hex (BSC Testnet = 97 decimal = 0x61 hex)
                chainName: "BSC Testnet",
                nativeCurrency: {
                  name: "Binance Coin",
                  symbol: "tBNB",
                  decimals: 18,
                },
                rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                blockExplorerUrls: ["https://testnet.bscscan.com"],
              },
            ],
          });
  
          notifySuccess("✅ Network added!");
        } catch (error) {
              notifyErrorMsg("❌ Error adding network: "+error);
        }
      } else {
  
        notifyErrorMsg("MetaMask not detected!");
      }
    }
  


  return (
    <header className="bg-gray-900 text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Title */}
          <div className="flex-shrink-0 text-xl font-bold">
             <Image src="/logo.png" width={140} height={140}  alt="logo"  />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="#" onClick={()=> addCustomNetwork()} className="bg-gradient-to-b from-[#C8F4FF] to-[#70D0FF] text-[#013243] px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">
              Add Network
            </a>
            <a href="https://testnet.bscscan.com/" target="_blank" className="bg-gradient-to-b from-[#C8F4FF] to-[#70D0FF] text-[#013243] px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">Explorer</a>
            <a href="https://www.bnbchain.org/en/testnet-faucet" target="_blank" className="bg-gradient-to-b from-[#C8F4FF] to-[#70D0FF] text-[#013243] px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">Claim Faucet</a>
          </nav>
           <div className="hidden lg:flex items-center gap-4">
                <Button onClick={() => open(isConnected ? { view: "Account" } : undefined) }> { isConnected ? '🌐 Connected' :'🌐 Connect Wallet'}</Button>
            </div>

          {/* Mobile Menu Button */}
           <div className="md:hidden">
                <Button onClick={() => open(isConnected ? { view: "Account" } : undefined) }> { isConnected ? '🌐 Connected' :'🌐 Connect Wallet'}</Button>
            </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-3">
            <a href="#" onClick={()=> addCustomNetwork()} className="w-max block bg-gradient-to-b from-[#C8F4FF] to-[#70D0FF] text-[#013243] px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">Add Network</a>
            <a href="https://testnet.bscscan.com/" target="_blank" className="w-max block bg-gradient-to-b from-[#C8F4FF] to-[#70D0FF] text-[#013243] px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">Explorer</a>
            <a href="https://www.bnbchain.org/en/testnet-faucet" target="_blank" className="w-max block bg-gradient-to-b from-[#C8F4FF] to-[#70D0FF] text-[#013243] px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">Claim Faucet</a>
        </div>
        
      )}
    </header>
  );
}
