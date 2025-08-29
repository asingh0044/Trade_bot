"use client";
import React, { useState } from "react";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { utils } from "ethers";
import ReCAPTCHA from "react-google-recaptcha";
import { useAccount } from "wagmi";
import { useDripToken } from "@/hooks/useDripToken";
const Page = () => {
  const [captchStatus, setCaptchaStatus] = useState<boolean>(false);
  const { address } = useAccount();
  const { isPending, mutate } = useDripToken();
  const getTokenHandler = () => {
    if (!captchStatus) {
      if (!address) {
        toast.error("Connect to metamask");
        return;
      }
      toast.error("Please Submit Captcha");
      return;
    }
    if (!utils.isAddress(address!)) {
      toast("Invalid wallet address");
      return;
    }
    mutate(undefined, {
      onSuccess: (result) => {
        toast.success(result.message);
        setCaptchaStatus(false);
      },
      onError: (result) => {
        toast.error(result.message);
      },
    });
  };

  const changeCaptchaStatus = () => {
    setTimeout(() => {
      setCaptchaStatus(true);
    }, 1500);
  };
  return (
    <div className="w-full h-[calc(100vh-6rem)] flex items-center justify-center">
      <BackgroundGradient className="rounded-[22px] w-11/12 lg:w-[600px] p-4 sm:p-10 bg-zinc-900">
        <p className="text-base sm:text-xl lg:text-3xl  mt-4 mb-2 text-neutral-200">
          Get Quantek Tokens
        </p>

        <p className="text-sm  text-neutral-300">
          Faucets provide tokens with no real-world value for development and
          testing purposes.
        </p>

        <div className="my-6 flex flex-col gap-y-1">
          <p className="text-xs lg:text-sm text-neutral-300">
            Wallet Address
          </p>
          <div className="p-2 rounded-md border border-neutral-300 outline-none text-neutral-300">
            {address}
          </div>
        </div>

        {!captchStatus && (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
            onChange={changeCaptchaStatus}
          />
        )}

        <Button
          onClick={getTokenHandler}
          variant="outline"
          className="cursor-pointer mt-4"
        >
          {isPending ? "Loading..." : "Get Tokens"}
        </Button>
      </BackgroundGradient>
    </div>
  );
};

export default Page;
