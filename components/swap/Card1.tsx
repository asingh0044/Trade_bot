import { TokenType } from "@/lib/types/transaction";
import { TokenDropdown } from "../common/TokenDropdown";
type Card1props = {
  props: {
    token1Index: number;
    updatedTokens: TokenType[];
    setToken1Index: (index: number) => void;
    asset1: string;
    setAsset1: (asset: string) => void;
  };
};
export const Card1 = ({ props }: Card1props) => {
  const { token1Index, updatedTokens, setToken1Index, asset1, setAsset1 } =
    props;
  return (
    <div className="w-full bg-white p-8 rounded-md">
      <div className="w-full flex justify-between ">
        <div>Sell</div>
        <div className="">
          <TokenDropdown
            dropdownProps={{
              tokenIndex: token1Index,
              data: updatedTokens,
              setTokenIndex: setToken1Index,
            }}
          />
          {token1Index !== -1 && (
            <div
              className={`text-sm text-right ${
                Number(asset1) >
                Number(updatedTokens?.[token1Index]?.tokenBalance)
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {updatedTokens?.[token1Index].tokenBalance}
            </div>
          )}
        </div>
      </div>

      <input
        value={asset1}
        type="text"
        placeholder="0.05"
        className="w-full mt-3 outline-none border-0 text-6xl font-bold "
        onChange={(e) => setAsset1(e.target.value)}
      />
    </div>
  );
};
