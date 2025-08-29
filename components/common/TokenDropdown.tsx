import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ControllerRenderProps } from "react-hook-form";
import { TokenType } from "@/lib/types/transaction";

type FormValues = {
  address: string;
  amount: string;
  contractAddress: string;
};
type DropdownProps = {
  dropdownProps: {
    tokenIndex: number;
    data?: TokenType[];
    setTokenIndex: (index: number) => void;
    field?: ControllerRenderProps<FormValues, "contractAddress">;
  };
};

export const TokenDropdown = ({ dropdownProps }: DropdownProps) => {
  const { tokenIndex, data, setTokenIndex, field } = dropdownProps;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border flex items-center gap-x-3 px-3 py-1 rounded-md text-sm w-fit">
        {tokenIndex === -1 ? "Choose Token" : `${data?.[tokenIndex].name}`}
        <ChevronDown className="text-black" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {data?.map((item, index) => (
          <DropdownMenuItem key={item.contractAddress}>
            <button
              type="button"
              onClick={() => {
                setTokenIndex(index);
                field && field.onChange(item.contractAddress);
              }}
              className="cursor-pointer flex items-center gap-x-3"
            >
              {item.name}
            </button>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
