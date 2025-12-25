"use client";
import { SwapPage } from "@/components/swap/SwapPage";
import { useGetQuote } from "@/hooks/useGetQuote";
import { useGetSwap } from "@/hooks/useGetSwap";
import { useWalletTokens } from "@/hooks/useWalletTokens";
import { useWrap } from "@/hooks/useWrap";
import { ETH_ADDRESS } from "@/lib/constant";
import { getToken } from "@/services/getSwapTokens";
import { getUniswapConfig } from "@/services/getUniswapConfig";
import { addSepoliaETH } from "@/services/UpdatedTokens";
import { SwapExactInSingle } from "@uniswap/v4-sdk";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useBalance } from "wagmi";

const Page = () => {
  const [asset1, setAsset1] = useState<string>("");
  const [config, setConfig] = useState<SwapExactInSingle | null>(null);
  const { address } = useAccount();
  const [token1Index, setToken1Index] = useState<number>(-1);
  const [token2Index, setToken2Index] = useState<number>(-1);

  const { data: walletBalance, refetch: refetchEThBalance } = useBalance({
    address,
  });
  const {
    data: walletTokens,
    refetch: refetchTokens,
    isFetching: isTokensFetching,
    isLoading: isTokensLoading,
  } = useWalletTokens(address!);
  let updatedTokens = walletTokens;
  if (walletTokens && walletBalance) {
    updatedTokens = addSepoliaETH(updatedTokens!, walletBalance.formatted);
  }

  const {
    data: quoteData,
    refetch,
    isLoading,
    isFetching,
  } = useGetQuote(
    config,
    token2Index !== -1 && updatedTokens
      ? getToken(updatedTokens[token2Index]) ?? null
      : null
  );

  useEffect(() => {
    if (
      asset1 &&
      token1Index !== -1 &&
      token2Index !== -1 &&
      token1Index !== token2Index
    ) {
      const config = getUniswapConfig(
        token1Index !== -1 && updatedTokens
          ? getToken(updatedTokens[token1Index]) ?? null
          : null,
        token2Index !== -1 && updatedTokens
          ? getToken(updatedTokens[token2Index]) ?? null
          : null,
        asset1
      );
      setConfig(config!);
      refetch();
    }
  }, [asset1, token1Index, token2Index]);

  const { mutate, isPending } = useGetSwap();
  const swapHandler = () => {
    if (token1Index === token2Index) {
      toast.error("Please choose another set of tokens.");
      return;
    }
    if (config) {
      mutate(config, {
        onSuccess: () => {
          toast("Swap successful");
          setAsset1("");
          refetchEThBalance();
          refetchTokens();
          setToken1Index(-1);
          setToken2Index(-1);
        },
        onError: () => {
          toast("Swap Failed");
        },
      });
    }
  };

  const { mutate: mutateWrap, isPending: wrapPending } = useWrap();
  const wrapHandler = () => {
    if (!token1Index || !token2Index || !updatedTokens) return;
    const inputToken = getToken(updatedTokens[token1Index]);
    if (!inputToken) {
      return;
    }
    mutateWrap(
      { inputToken, amount: asset1 },
      {
        onSuccess: () => {
          setAsset1("");
          setToken1Index(-1);
          setToken2Index(-1);
          toast(
            updatedTokens?.[token1Index].contractAddress.toLowerCase() ===
              ETH_ADDRESS.toLowerCase()
              ? "Wrap successful"
              : "Unrap successful"
          );
          setAsset1("");
          refetchEThBalance();
          refetchTokens();
        },
        onError: () => {
          toast(
            updatedTokens?.[token1Index].contractAddress.toLowerCase() ===
              ETH_ADDRESS.toLowerCase()
              ? "Wrap failed"
              : "Unwrap failed"
          );
        },
      }
    );
  };
  return (
    <div className="w-full h-[calc(100vh-6rem)] flex items-center justify-center">
      <SwapPage
        props={{
          token1Index: token1Index,
          updatedTokens: updatedTokens ?? [],
          setToken1Index: setToken1Index,
          asset1: asset1,
          setAsset1: setAsset1,
          isLoading: isLoading,
          isFetching: isFetching,
          token2Index: token2Index,
          setToken2Index: setToken2Index,
          quoteData: quoteData ?? null,
          isTokenLoading: isTokensLoading,
          isTokenFetching: isTokensFetching,
          isPending: isPending,
          wrapHandler: wrapHandler,
          wrapPending: wrapPending,
          swapHandler: swapHandler,
        }}
      />
    </div>
  );
};

export default Page;
