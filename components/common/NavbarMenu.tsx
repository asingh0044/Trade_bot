import { navLinks } from "@/lib/constant";
import Link from "next/link";
import { DisconnectButton } from "./DisconnectButton";
import { CopyButton } from "./CopyButton";

interface NavbarMenuProps {
  address?: `0x${string}`;
}
export const NavbarMenu = ({ address }: NavbarMenuProps) => {
  return (
    <div className="">
      <div className="w-fit gap-y-1 flex flex-col items-start">
        {Object.keys(navLinks).map((key) => (
          <Link
            key={Number(key)}
            href={navLinks[Number(key)]?.link}
            className="text-black uppercase"
          >
            <div className="text-sm">{navLinks[Number(key)]?.title}</div>
          </Link>
        ))}
      </div>

      <CopyButton address={address} />

      <DisconnectButton />
    </div>
  );
};
