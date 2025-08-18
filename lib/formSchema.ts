import { z } from "zod";

export const formSchema = z.object({
  address: z
    .string()
    .length(42, "Invalid Ethereum address length")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format"),

  amount: z.string().refine(
    (val) => {
      return /^(\d+)(\.\d{1,18})?$/.test(val) && parseFloat(val) > 0;
    },
    {
      message: "Amount must be a positive number with up to 18 decimal places",
    }
  ),
});

export const tokenFormSchema = z.object({
  address: z
    .string()
    .length(42, "Invalid Ethereum address length")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum address format"),

  amount: z.string().refine(
    (val) => {
      return /^(\d+)(\.\d{1,18})?$/.test(val) && parseFloat(val) > 0;
    },
    {
      message: "Amount must be a positive number with up to 18 decimal places",
    }
  ),
  contractAddress: z.string().nonempty("Token is required"),
});
