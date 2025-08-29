"use client";
import { Loader } from "@/components/common/Loader";
import { SepoliaTable } from "@/components/home/SepoliaTable";
import { TransactionTable } from "@/components/home/TransactionTable";
import { useSepoliaTransactions } from "@/hooks/useSepoliaTransactions";
import { useWalletAddress } from "@/hooks/useWalletAddress";
import { ethers } from "ethers";
import React, { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";

const Page = () => {
  const { address } = useAccount();
  const { data: walletBalance, refetch } = useBalance({
    address: address,
  });
  useEffect(() => {
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const onNewBlock = (blockNumber:number) => {
      refetch();
    };

    provider.on("block", onNewBlock);

    return () => {
      provider.off("block", onNewBlock);
    };
  }, [refetch]);
  const { data: walletTransactions } = useWalletAddress(address || "");
  const { data: sepoliaTxns, isLoading } = useSepoliaTransactions();
  return (
    <div className="text-white w-11/12 lg:w-3/4 mx-auto">
      {walletBalance && (
        <div className="text-center font-extrabold text-sm md:text-xl lg:text-4xl mt-6">
          {Number(walletBalance?.formatted).toFixed(4)} {walletBalance?.symbol}
        </div>
      )}
      {address && (
        <div className="mt-4 mb-8 lg:mb-20">
          <TransactionTable data={walletTransactions!} />
        </div>
      )}{" "}
      {!address && (
        <>
          {isLoading ? (
            <div className="w-full flex h-[calc(100vh-6rem)] items-center justify-center">
              <Loader />
            </div>
          ) : (
            <div className="mt-4 mb-8 lg:mb-20">
              <SepoliaTable data={sepoliaTxns!} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
