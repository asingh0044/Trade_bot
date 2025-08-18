"use client";
import { Loader } from "@/components/common/Loader";
import { SepoliaTable } from "@/components/home/SepoliaTable";
import { TransactionTable } from "@/components/home/TransactionTable";
import { useSepoliaTransactions } from "@/hooks/useSepoliaTransactions";
import { useWalletAddress } from "@/hooks/useWalletAddress";
import React from "react";
import { useAccount, useBalance , } from "wagmi";

const Page = () => {
  const { address } = useAccount();
  const { data: walletBalance } = useBalance({
    address: address,
  });
  const { data: walletTransactions } = useWalletAddress(address || "");
  const { data: sepoliaTxns, isLoading } = useSepoliaTransactions();
  return (
    <div className="text-white w-11/12 lg:w-3/4 mx-auto">
      {address && (
        <div className="text-center font-extrabold text-sm md:text-xl lg:text-4xl mt-6">
          {Number(walletBalance?.formatted).toFixed(4)} {walletBalance?.symbol}
        </div>
      )}
      {address && (
        <div className="mt-4">
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
            <div>
              <SepoliaTable data={sepoliaTxns!} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
