import { TokenType } from "@/lib/types/transaction";
import { TokenDropdown } from "../common/TokenDropdown";
import { Loader2 } from "../common/Loader";
import { ETH_ADDRESS, WETH_ADDRESS } from "@/lib/constant";

type Card2props = {
  props: {
    token1Index: number;
    token2Index: number;
    updatedTokens: TokenType[];
    setToken2Index: (index: number) => void;
    asset1: string;
    quoteData: string | null;
    isLoading: boolean;
    isFetching: boolean;
  };
};
export const Card2 = ({ props }: Card2props) => {
  const {
    token1Index,
    token2Index,
    updatedTokens,
    setToken2Index,
    asset1,
    quoteData,
    isLoading,
    isFetching,
  } = props;
  return (
    <div className="w-full bg-white p-8 rounded-md">
      <div className="w-full flex justify-between">
        <div>Buy</div>
        <div className="flex flex-col items-end">
          <TokenDropdown
            dropdownProps={{
              tokenIndex: token2Index,
              data: updatedTokens,
              setTokenIndex: setToken2Index,
            }}
          />
          {token2Index !== -1 && (
            <div className="text-right text-sm  ">
              {Number(updatedTokens[token2Index].tokenBalance).toFixed(2)}
            </div>
          )}
        </div>
      </div>

      <>
        {isLoading || isFetching ? (
          <div className="mt-16">
            <Loader2 />
          </div>
        ) : (
          <>
            {(updatedTokens?.[token1Index]?.contractAddress.toLowerCase() ===
              ETH_ADDRESS.toLowerCase() &&
              updatedTokens?.[token2Index]?.contractAddress.toLowerCase() ===
                WETH_ADDRESS.toLowerCase()) ||
            (updatedTokens?.[token1Index]?.contractAddress.toLowerCase() ===
              WETH_ADDRESS.toLowerCase() &&
              updatedTokens?.[token2Index]?.contractAddress.toLowerCase() ===
                ETH_ADDRESS.toLowerCase()) ? (
              <div className=" text-6xl font-bold ">{asset1}</div>
            ) : (
              <>
                {quoteData && asset1 ? (
                  <div className="text-6xl font-bold ">
                    {Number(quoteData).toFixed(6)}
                  </div>
                ) : (
                  <div className="mt-16 text-xs md:text-sm">
                    Please choose tokens and amount to know conversion rate.
                  </div>
                )}
              </>
            )}
          </>
        )}
      </>
    </div>
  );
};
