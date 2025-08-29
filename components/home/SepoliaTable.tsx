import { providers, utils } from "ethers";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
type SepoliaTableProps = {
  data: providers.TransactionResponse[];
};

export const SepoliaTable = ({ data }: SepoliaTableProps) => {
  return (
    <div className=" rounded-md border mt-8  overflow-x-auto  scrollbar-hide ">
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
            <TableHead className="w-[300px] text-center">To</TableHead>
            <TableHead className="w-[300px] text-center">From</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {data?.map((transaction: providers.TransactionResponse) => (
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
                {Number(utils.formatEther(transaction.value)).toFixed(3)} ETH
              </TableCell>
              <TableCell className="text-right">{transaction.to}</TableCell>
              <TableCell className="text-right">{transaction.from}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
