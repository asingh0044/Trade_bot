"use client";
import { trimAddress } from "@/lib/utils";
import { ChevronDown, Copy, LogOut } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Navbar = () => {
  const { connectors, connect } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const connectHandler = () => {
    const metamaskConnector = connectors.find(
      (connector) =>
        connector.name === "MetaMask" || connector.id === "injected"
    );
    if (!metamaskConnector) {
      alert("Please install Metamask");
      return;
    }
    connect({ connector: metamaskConnector });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address!);
  };

  return (
    <div className=" py-2 md:py-4 lg:py-6 border-b-[0.5px] border-white">
      <div className="w-11/12 lg:w-3/4 mx-auto flex justify-between items-center">
        <div className="uppercase font-semibold lg:font-extrabold text-sm md:text-xl lg:text-4xl text-white">
          Trade Bot
        </div>

        <div className="flex w-fit items-center gap-x-5">
          <Link href="" className="text-white uppercase">
            <div className="text-sm">Send</div>
          </Link>
          {!isConnected ? (
            <button
              onClick={connectHandler}
              className="px-4 py-2 rounded-full uppercase text-sm bg-white text-black font-semibold cursor-pointer"
            >
              Connect
            </button>
          ) : (
            <div className="flex items-center w-fit gap-x-2">
              <div className="text-white text-sm font-semibold">
                {trimAddress(address)}
              </div>
              <button onClick={copyToClipboard} className="text-white">
                <Copy size={12} className="cursor-pointer " />
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none border-0">
                  <ChevronDown className="text-white" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <button className="cursor-pointer flex items-center gap-x-3" onClick={()=>disconnect()}>
                      <span><LogOut  size={10}/></span> Disconnect
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
