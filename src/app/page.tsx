"use client";
import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import InfoCard from "../app/components/InfoCard";
import { FaCoins, FaUsers, FaCrown } from "react-icons/fa";
import abi from "../app/contractABI/DFXNFT.json";
import { useAccount , useReadContract, useWriteContract  } from "wagmi"; 
import { getClient } from '../app/config/client'
import { Web3 } from "web3";
import  $  from "jquery";
const Provider = new Web3.providers.HttpProvider("https://rpc.ankr.com/eth");
const web3 = new Web3(Provider);

import HowToMint from "./components/HowToMint";


export default function Home() {

    const [ balance, setBalance ] = useState(0);
    const [whitelist, setWhitelist] = useState('false');
    const [whitelistMinted, setWhitelistMinted] = useState(0);
    const [publicMint, setPublicMint] = useState('false');
    const [ mintCost, setMintCost ] = useState('0');
    const [ maxSupply, setMaxSupply ] = useState(0);
    const [ totalSupply, setTotalSupply ] = useState(0);
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {  data: hash, error, writeContractAsync } = useWriteContract()
    const contractAddress = "0x38A943B8F6fFD639F5F464dB83D304fB4C51dCd0";

    const  notifyErrorMsg = (msg : string) => toast.error(msg);
    const  notifySuccess = (msg : string) => toast.success(msg);
    
    // usestate for wallet connect and connected
    const { isConnected, address, isDisconnected } = useAccount();

     const { data: balanceInfo } = useReadContract({
          abi: abi.abi,
          address: contractAddress,
          functionName: 'balanceOf',
          args:[address],

        })

    const { data: whitelistInfo } = useReadContract({
          abi: abi.abi,
          address: contractAddress,
          functionName: 'whitelist',
          args:[address],
        })

    const { data: whitelistMintedInfo } = useReadContract({
          abi: abi.abi,
          address: contractAddress,
          functionName: 'whitelistMinted',
          args:[address],
        })

    const { data: publicMintEnabled } = useReadContract({
          abi: abi.abi,
          address: contractAddress,
          functionName: 'publicMintEnabled',
        })

         const { data: mintCostInfo } = useReadContract({
          abi: abi.abi,
          address: contractAddress,
          functionName: 'mintCost',
        })
    
        const { data: maxSupplyInfo } = useReadContract({
          abi: abi.abi,
          address: contractAddress,
          functionName: 'MAX_SUPPLY',
          chainId: 97,
          args:[],
        })
    
        const { data: totalSupplyInfo } = useReadContract({
          abi: abi.abi,
          address: contractAddress,
          functionName: 'totalSupply',
          chainId: 97,
          args:[],
        })
      
      
      async function handleMintButton()  {
    
        $("#mintbtn").html('Minting...');
        $("#mintbtn").attr('disabled', 'true');
    

        if(isDisconnected){
        notifyErrorMsg('Connect wallet!');
        $("#mintbtn").html('MINT NFT');
        $("#mintbtn").attr('disabled', 'false');
         return;
        }
        
    
          const publicClient = getClient(97);

          let price;
            if(whitelist){
              price = 0;
              if(whitelistMinted > 0 && publicMint === 'false'){
                notifyErrorMsg('Whitelist already minted');
                $("#mintbtn").html('MINT NFT');
                $("#mintbtn").attr('disabled', 'false');
                return;
              }
              if(whitelistMinted > 0 && publicMint === 'true'){
                 price = mintCost; 
              }

            }else{
              if(publicMint === 'false'){
                notifyErrorMsg('Public Mint Not Enbabled Yet!');
                $("#mintbtn").html('MINT NFT');
                $("#mintbtn").attr('disabled', 'false');
                return;
              }
             price = mintCost; 
            }

    
         try {
                //setBuyButtonState(true);
                //setBuyButtonText('Buying...');
                const  hash  = await writeContractAsync({ 
                  abi: abi.abi,
                  address: contractAddress,
                  functionName: 'mint',
                  value: BigInt(price)
                })
        
                const txn = await publicClient.waitForTransactionReceipt( { hash } )
                  
                if(txn.status == "success"){
                          
                  //setBuyButtonState(false);
                  //setBuyButtonText('Buy Now');
                   notifySuccess('New NFT Minted!');
              if(whitelist){
                  const creditNFTCoins = await fetch("/api/credit-nft-coins", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({  wallet_address: address }),
                  });

                  const res =  await creditNFTCoins.json();
                  
                  if(res.status === 200){
                    notifySuccess(res.message)
                  }else{
                    notifyErrorMsg(res.message);
                  }
              }
                  
                    $("#mintbtn").html('MINT NFT');
                    $("#mintbtn").attr('disabled', 'false');
                  
                  }
              
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              } catch (error:any) {
                notifyErrorMsg(error.shortMessage);
                $("#mintbtn").html('MINT NFT');
                $("#mintbtn").attr('disabled', 'false');
               console.log(error);
                //setBuyButtonState(false);
               // setBuyButtonText('Buy Now');
                
              }
      
       }


         useEffect(() => {
           
           if(isConnected){
               if(balanceInfo){
               setBalance(Number(balanceInfo));
               }

               if(whitelistInfo){
                setWhitelist(whitelistInfo.toString());
               }
               if(whitelistMintedInfo){
                setWhitelistMinted(Number(whitelistMintedInfo));
               }
           }
           if(mintCostInfo){

            setMintCost(mintCostInfo.toString())
           }
           if(publicMintEnabled){
            setPublicMint(publicMintEnabled.toString());

           }
           if(maxSupplyInfo){
             setMaxSupply(Number(maxSupplyInfo));
           }
           if(totalSupplyInfo){
             console.log(totalSupplyInfo);
             setTotalSupply(Number(totalSupplyInfo))
           }
       
           window.scrollTo({
             top: 0,
             behavior: "smooth",
           });
         }, [isConnected,  mintCostInfo,publicMintEnabled , whitelistMintedInfo,whitelistInfo, balanceInfo, maxSupplyInfo, totalSupplyInfo]);
       
    
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-3xl font-bold text-[#02b3ff] mt-10">DFX <span className="text-white">MINT NFT</span></h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        <InfoCard icon={<FaCoins />} title="Your Holdings" value={ balance.toString()+' NFTs' } delay={0.2} />
        <InfoCard icon={<FaUsers />} title="Total Supply" value={maxSupply.toLocaleString()} delay={0.4} />
        <InfoCard icon={<FaCrown />} title="Total Minted" value={totalSupply.toLocaleString()} delay={0.6} />
      </div>
      <div className="max-w-5xl w-full mt-5 mb-5 lg:flex items-center gap-4">
          <button id="mintbtn" onClick={()=> handleMintButton()} className="w-full bg-gradient-to-b from-[#C8F4FF] to-[#70D0FF] text-[#013243] px-5 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition">
             MINT NFT
          </button>
      </div>
      <HowToMint/>
    </div>
  );
}
