"use client";
import { TransactionTable } from "@/components/home/TransactionTable";
import { useWalletAddress } from "@/hooks/useWalletAddress";
import { Transaction } from "@/lib/types/transaction";
import React from "react";
import { useAccount, useBalance } from "wagmi";

const Page = () => {
  const { address } = useAccount();
  const { data: walletBalance } = useBalance({
    address: address,
  });
  const {
    data: walletTransactions,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useWalletAddress(address || "");
  console.log("wallet transactions", walletTransactions);
  return (
    <div className="text-white w-11/12 lg:w-3/4 mx-auto">
      <div className="text-center font-extrabold text-sm md:text-xl lg:text-4xl mt-6">
        {Number(walletBalance?.formatted).toFixed(4)} {walletBalance?.symbol}
      </div>
      {address && (
        <div className="mt-4">
          <TransactionTable data={walletTransactions!} />
        </div>
      )}
    </div>
  );
};

export default Page;
