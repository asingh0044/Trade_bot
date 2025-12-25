import { Copy } from "lucide-react";
import { toast } from "sonner";

interface CopyButtonProps {
  address?: `0x${string}`;
}

export const CopyButton = ({ address }: CopyButtonProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(address!);
    toast.success("Address Copied");
  };
  return (
    <button
      onClick={copyToClipboard}
      className="lg:text-white text-black uppercase text-sm"
    >
      <Copy size={12} className="cursor-pointer hidden lg:block " />
      <span className="block lg:hidden">Copy Address</span>
    </button>
  );
};
