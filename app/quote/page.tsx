"use client";
import { getQuote } from "@/actions/getQuote";
import { CurrentConfig } from "@/uniswap.config";

const Page = () => {
  return (
    <div>
      <button onClick={()=>getQuote(CurrentConfig)} className="">
        click to run get quote
      </button>
    </div>
  );
};

export default Page;
