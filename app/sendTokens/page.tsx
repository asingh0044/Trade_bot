"use client";
import { useAccount } from "wagmi";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { tokenFormSchema } from "@/lib/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useWalletTokens } from "@/hooks/useWalletTokens";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { useSendToken } from "@/hooks/useSendToken";

const Page = () => {
  const [tokenIndex, setTokenIndex] = useState<number>(-1);
  const { address } = useAccount();
  if (!address) {
    return;
  }
  const { data, refetch } = useWalletTokens(address);
  const form = useForm<z.infer<typeof tokenFormSchema>>({
    resolver: zodResolver(tokenFormSchema),
    defaultValues: {
      address: "",
      amount: "",
      contractAddress: "",
    },
  });
  const mutation = useSendToken();
  async function onSubmit(values: z.infer<typeof tokenFormSchema>) {
    const res = await mutation.mutateAsync(
      {
        tokenAddress: values.contractAddress,
        toAddress: values.address,
        amount: values.amount,
      },
      {
        onSuccess: () => {
          refetch();
          form.reset();
          setTokenIndex(-1);
        },
      }
    );
  }
  return (
    <div className="w-full h-[calc(100vh-6rem)] flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-11/12 md:w-3/4 lg:w-[500px] bg-white py-6 px-4 lg:py-12 lg:px-8 rounded-md shadowm-sm"
        >
          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Token</FormLabel>
                <FormControl>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="border flex items-center gap-x-3 px-3 py-1 rounded-md text-sm w-fit">
                      {tokenIndex === -1
                        ? "Choose Token"
                        : `${data?.[tokenIndex].name}`}
                      <ChevronDown className="text-black" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {data?.map((item, index) => (
                        <DropdownMenuItem key={item.contractAddress}>
                          <button
                            type="button"
                            onClick={() => {
                              setTokenIndex(index);
                              field.onChange(item.contractAddress);
                            }}
                            className="cursor-pointer flex items-center gap-x-3"
                          >
                            {item.name}
                          </button>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet Address</FormLabel>
                <FormControl>
                  <Input placeholder="0xabcd1234..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Amount</FormLabel>
                <FormControl>
                  <Input placeholder="0.05 ETH" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {tokenIndex >= 0 && (
            <div
              className={`${
                Number(data?.[tokenIndex]?.tokenBalance) <
                Number(form.watch("amount"))
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              Current Token Balance: {data?.[tokenIndex]?.tokenBalance}{" "}
              {data?.[tokenIndex]?.symbol}
            </div>
          )}
          <Button
            disabled={mutation.isPending}
            className="cursor-pointer"
            type="submit"
          >
            {mutation.isPending ? "Loading..." : "Send"}
          </Button>
          {mutation.isSuccess && !mutation.isError && (
            <div className="mt-2 text-sm text-green-500">
              Transaction successful.
            </div>
          )}
          {mutation.isError && (
            <div className="mt-2 text-sm text-red-500">Transaction failed.</div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Page;
