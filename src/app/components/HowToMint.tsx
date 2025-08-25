import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';

const TimelineItem = ({ title, description, id }: {title:string, description:string,id:number}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null); // Reference to the div

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting); // Set state to true if the element is visible
      },
      {
        threshold: 0.7, // Trigger when 10% of the div is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className="flex items-start mb-20 relative">
      <div className="flex flex-col items-center z-10 mr-6 mt-16">
        <div className="w-4 h-4 bg-[#38DCC8] rounded-full"></div>
      </div>
      <div
        className={`absolute left-[30px] sm:left-[50px] text-[#02b3ff] text-[80px] sm:text-[96px] font-bold transition-opacity duration-500 ${
          isVisible ? "opacity-100" : "opacity-10"
        }`}
      >
        {`0${id}`}
      </div>
      <div className="flex-grow ml-[100px] sm:ml-[140px] mt-4">
        <h3 className="text-[20px] sm:text-[28px] mb-2 font-bold text-white">
          {title}
        </h3>
        <p className="text-grayish text-[14px] sm:text-[16px] font-space font-normal">
          {description}
        </p>
      </div>
    </div>
  );
};

const HowToMint = () => {

  const timelineData = [
    {
      id: 1,
      title: 'CONNECT WALLET',
      description: 'Use Metamask or Trust Wallet to connect your wallet in seconds.',
    },
    {
      id: 2,
      title: 'CONFIRM TRANSACTION',
      description: 'You can buy NFT with ETH only.',
    },
    {
      id: 3,
      title: 'RECEIVE YOUR NFTs',
      description: 'Congratulations! You just received your NFT.',
    },
  ];

  return (
    <div className="bg-[#000] px-4 pt-10 w-full relative">
      <Image className="w-full h-full absolute top-0 left-0 z-[1]" src="/bg-shade.png" width={140} height={140}  alt="bg"  />
      
      <div className="max-w-[1280px]  m-auto w-full">
        <h1 className="text-[35px] capitalize sm:text-[50px] sm:leading-[57.5px] text-[#02b3ff] font-bold max-w-[600px] mx-auto text-center">
         HOW <span className="text-white">TO MINT</span>
        </h1>
        <div className="w-full flex lg:items-center justify-between lg:flex-row flex-col">
          <div className="w-full mt-20 relative max-w-[450px] mx-auto ">
            <div className="absolute min-h-[440px] left-2 top-[70px] border-l-2 border-dotted border-[#38DCC8]"></div>
            {timelineData.map((item) => (
              <TimelineItem key={item.id} {...item} />
            ))}
          </div>
          <div className="w-full flex items-center justify-center lg:items-end lg:justify-end mt-10">
                <Image className="rounded-[13.50px]" src="/card-one.png" width={380} height={740}  alt="bg"  />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToMint;
