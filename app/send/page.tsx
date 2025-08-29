"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { formSchema } from "@/lib/formSchema";
import {
  type BaseError,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";
import { useRouter } from "next/navigation";

const Page = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      amount: "",
    },
  });
  const {
    data: hash,
    sendTransaction,
    isPending,
    error,
  } = useSendTransaction();
  const router = useRouter();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  if (isConfirmed) {
    router.push("/");
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const to = values.address as `0x${string}`;
    const value = values.amount as string;
    sendTransaction({ to, value: parseEther(value) });
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
          <Button disabled={isPending} className="cursor-pointer" type="submit">
            {isPending ? "Confirming..." : "Send"}
          </Button>

          {hash && (
            <a target="_blank" href={`${process.env.NEXT_PUBLIC_ETHERSCAN_TRASACTION_URL}${hash}`}>
              <Button variant="link">Transaction Details</Button>
            </a>
          )}
          {error && (
            <div>
              Error: {(error as BaseError).shortMessage || error.message}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};

export default Page;
