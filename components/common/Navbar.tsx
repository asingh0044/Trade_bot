"use client";
import { trimAddress } from "@/lib/utils";
import { ChevronDown,  Menu } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Connect } from "../home/Connect";
import { navLinks } from "@/lib/constant";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { NavbarMenu } from "./NavbarMenu";
import { DisconnectButton } from "./DisconnectButton";
import { CopyButton } from "./CopyButton";

export const Navbar = () => {
  const { address, isConnected } = useAccount();


  return (
    <div className=" py-2 md:py-4 lg:py-6 border-b-[0.5px] border-white">
      <div className="w-11/12 lg:w-3/4 mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="uppercase font-semibold lg:font-extrabold text-sm md:text-xl lg:text-4xl text-white"
        >
          Trade Bot
        </Link>

        <div>
          {!isConnected ? (
            <Connect />
          ) : (
            <>
              <div className="hidden lg:flex w-fit gap-x-4 items-center">
                <div className="w-fit gap-x-3 flex items-center">
                  {Object.keys(navLinks).map((key) => (
                    <Link
                      key={Number(key)}
                      href={navLinks[Number(key)]?.link}
                      className="text-white uppercase"
                    >
                      <div className="text-sm">
                        {navLinks[Number(key)]?.title}
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="flex items-center w-fit gap-x-2">
                  <div className="text-white text-sm font-semibold">
                    {trimAddress(address)}
                  </div>
                  <CopyButton address={address} />
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none border-0">
                      <ChevronDown className="text-white" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <DisconnectButton />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="block lg:hidden">
                <Popover>
                  <PopoverTrigger className="text-white cursor-pointer translate-y-1 ">
                    <Menu />
                  </PopoverTrigger>
                  <PopoverContent>
                    <NavbarMenu address={address} />
                  </PopoverContent>
                </Popover>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
