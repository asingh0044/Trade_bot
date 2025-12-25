import { useDisconnect } from "wagmi";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export const DisconnectButton = () => {
  const { disconnect } = useDisconnect();
  const router = useRouter();
  return (
    <div>
      <button
        className="cursor-pointer flex items-center text-sm uppercase gap-x-3"
        onClick={() => {
          disconnect();
          router.push("/");
        }}
      >
        <span className="hidden lg:block">
          <LogOut size={10} />
        </span>{" "}
        Disconnect
      </button>
    </div>
  );
};
