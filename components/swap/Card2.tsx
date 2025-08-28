import { TokenType } from "@/lib/types/transaction";
import { TokenDropdown } from "../common/TokenDropdown";
import { Loader2 } from "../common/Loader";

type Card2props = {
  props: {
    token1Index: number;
    token2Index: number;
    updatedTokens: TokenType[];
    setToken2Index: (index: number) => void;
    asset1: string;
    quoteData: string;
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
        <div className="">
          <TokenDropdown
            dropdownProps={{
              tokenIndex: token2Index,
              data: updatedTokens,
              setTokenIndex: setToken2Index,
            }}
          />
          {token2Index !== -1 && (
            <div className="text-right text-sm  ">
              {updatedTokens?.[token2Index]?.tokenBalance}
            </div>
          )}
        </div>
      </div>

      <>
        {isLoading || isFetching ? (
          <Loader2 />
        ) : (
          <>
            {asset1 === "" ? (
              <input
                disabled
                type="text"
                className=" outline-none border-0 text-6xl font-bold "
                value={""}
              />
            ) : (
              <>
                {(token1Index === 3 && token2Index === 4) ||
                (token1Index === 4 && token2Index === 3) ? (
                  <div className=" outline-none border-0 text-6xl font-bold ">
                    {asset1}
                  </div>
                ) : (
                  <div className=" outline-none border-0 text-6xl font-bold ">
                    {Number(quoteData).toFixed(6) || ""}
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
