import { ETH_ADDRESS, WETH_ADDRESS } from "@/lib/constant";
import { Card1 } from "./Card1";
import { Card2 } from "./Card2";
import { Button } from "../ui/button";
import { TokenType } from "@/lib/types/transaction";

type swapPageProps = {
  props: {
    token1Index: number;
    updatedTokens: TokenType[];
    setToken1Index: (index: number) => void;
    asset1: string;
    setAsset1: (asset: string) => void;
    isLoading: boolean;
    isFetching: boolean;
    token2Index: number;
    setToken2Index: (index: number) => void;
    quoteData: string | null;
    isTokenLoading: boolean;
    isTokenFetching: boolean;
    isPending: boolean;
    wrapHandler: () => void;
    wrapPending: boolean;
    swapHandler: () => void;
  };
};

export const SwapPage = ({ props }: swapPageProps) => {
  const {
    token1Index,
    updatedTokens,
    setToken1Index,
    asset1,
    setAsset1,
    isTokenLoading,
    isTokenFetching,
    token2Index,
    setToken2Index,
    quoteData,
    isLoading,
    isFetching,
    isPending,
    wrapHandler,
    wrapPending,
    swapHandler,
  } = props;
  return (
    <div className="space-y-8 w-11/12 relative md:w-3/4 lg:w-[600px] py-6 px-4 lg:py-12 lg:px-8 rounded-md shadowm-sm">
      <Card1
        props={{
          token1Index: token1Index,
          updatedTokens: updatedTokens!,
          setToken1Index: setToken1Index,
          asset1: asset1,
          setAsset1: setAsset1,
          isFetching: isTokenFetching,
          isLoading: isTokenLoading,
        }}
      />
      <Card2
        props={{
          token1Index: token1Index,
          token2Index: token2Index,
          updatedTokens: updatedTokens!,
          setToken2Index: setToken2Index,
          asset1: asset1,
          quoteData: quoteData!,
          isLoading: isLoading,
          isFetching: isFetching,
          isTokenFetching: isTokenFetching,
          isTokenLoading: isTokenLoading,
        }}
      />

      {(updatedTokens?.[token1Index]?.contractAddress.toLowerCase() ===
        ETH_ADDRESS.toLowerCase() &&
        updatedTokens?.[token2Index]?.contractAddress.toLowerCase() ===
          WETH_ADDRESS.toLowerCase()) ||
      (updatedTokens?.[token1Index]?.contractAddress.toLowerCase() ===
        WETH_ADDRESS.toLowerCase() &&
        updatedTokens?.[token2Index]?.contractAddress.toLowerCase() ===
          ETH_ADDRESS.toLowerCase()) ? (
        <Button
          onClick={wrapHandler}
          disabled={asset1.length <= 0 || wrapPending}
          className="w-full py-4 cursor-pointer"
        >
          {wrapPending ? (
            "Loading..."
          ) : (
            <span>
              {updatedTokens?.[token1Index].contractAddress.toLowerCase() ===
              WETH_ADDRESS.toLowerCase()
                ? "Unwrap"
                : "Wrap"}
            </span>
          )}
        </Button>
      ) : (
        <Button
          onClick={swapHandler}
          disabled={
            asset1.length <= 0 || token1Index === -1 || token2Index === -1 || isPending
          }
          className="w-full py-4 cursor-pointer"
        >
          {isPending ? "Loading..." : "Swap"}
        </Button>
      )}
    </div>
  );
};
