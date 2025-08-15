"use client";
import React from "react";
import { useAccount, useBalance } from "wagmi";

const Page = () => {
  const { address } = useAccount();
  const { data: walletBalance } = useBalance({
    address: address,
  });
  return <div className="text-white w-11/12 lg:w-3/4 mx-auto">
    <div className="text-center font-extrabold text-sm md:text-xl lg:text-4xl mt-6">
      {Number(walletBalance?.formatted).toFixed(4)} {walletBalance?.symbol}
    </div>
    <div className="mt-4">
      <div>Wallet Transactions :</div>
    </div>
  </div>;
};

export default Page;
