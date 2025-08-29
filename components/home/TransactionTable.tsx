"use client";
import React, { useEffect, useState } from "react";
import { Transaction, TransactionTableProps } from "@/lib/types/transaction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { utils } from "ethers";
import { useAccount } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { filterOptions } from "@/lib/constant";

export const TransactionTable = ({ data }: TransactionTableProps) => {
  const [filteredData, setFilteredData] = useState<Transaction[]>([]);
  const [filterOption, setFilterOption] = useState<number>(0);
  const { address } = useAccount();

  const filterHandler = () => {
    let res: Transaction[] = [];
    if (!data) {
      setFilteredData([]);
      return;
    }
    switch (filterOption) {
      case 1:
        res = data.filter(
          (item) => item.from.toLowerCase() === address?.toLowerCase()
        );
        break;
      case 2:
        res = data.filter(
          (item) => item.to.toLowerCase() === address?.toLowerCase()
        );
        break;
      default:
        res = data;
    }
    setFilteredData(res);
  };
  useEffect(() => {
    filterHandler();
  }, [filterOption, data]);

  return (
    <>
      {!data ? (
        <div className="w-full mt-8 text-center font-bold text-xl md:text-3xl lg:text-5xl text-white">
          No Transactions available...
        </div>
      ) : (
        <>
          <div className="mt-6 lg:mt-12">Recent Transactions:</div>
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none border-0 flex items-center gap-x-3 px-3 py-1 rounded-full bg-white text-black mt-2">
              {filterOptions[Number(filterOption)].title}{" "}
              <ChevronDown className="text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="">
                {Object.keys(filterOptions).map((key) => (
                  <button
                    key={Number(key)}
                    className="cursor-pointer flex items-center gap-x-3"
                    onClick={() => setFilterOption(Number(key))}
                  >
                    {filterOptions[Number(key)].title}
                  </button>
                ))}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className=" rounded-md border mt-8  overflow-x-auto scrollbar-hide">
            <Table className="min-w-[1000px]">
              <TableHeader className="bg-white">
                <TableRow>
                  <TableHead className="w-[100px] text-center">
                    Block Number
                  </TableHead>
                  <TableHead className="w-[300px] text-center">
                    Transaction Hash
                  </TableHead>
                  <TableHead className="text-center w-[75px]">Amount</TableHead>
                  {(filterOption === 1 || filterOption === 0) && (
                    <TableHead className="w-[300px] text-center">To</TableHead>
                  )}
                  {(filterOption === 2 || filterOption === 0) && (
                    <TableHead className="w-[300px] text-center">
                      From
                    </TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {filteredData?.map((transaction: Transaction) => (
                  <TableRow key={transaction.hash} className="">
                    <TableCell className="font-medium text-center">
                      {transaction.blockNumber}
                    </TableCell>
                    <TableCell>
                      <a
                        target="_blank"
                        href={`${process.env.NEXT_PUBLIC_ETHERSCAN_TRASACTION_URL}${transaction.hash}`}
                      >
                        {transaction.hash}
                      </a>
                    </TableCell>
                    <TableCell>
                      {Number(utils.formatEther(transaction.value)).toFixed(3)}{" "}
                      ETH
                    </TableCell>
                    {(filterOption === 1 || filterOption === 0) && (
                      <TableCell className="text-right">
                        {transaction.to || transaction.contractAddress}
                      </TableCell>
                    )}
                    {(filterOption === 2 || filterOption === 0) && (
                      <TableCell className="text-right">
                        {transaction.from}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </>
  );
};
