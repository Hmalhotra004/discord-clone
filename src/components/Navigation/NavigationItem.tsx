"use client";

import ActionTooltip from "@/components/ActionTooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface Props {
  id: string;
  imageUrl: string;
  name: string;
}

const NavigationItem = ({ id, imageUrl, name }: Props) => {
  const params = useParams();
  const router = useRouter();

  function handleServerIconClick() {
    router.push(`/servers/${id}`);
  }

  return (
    <ActionTooltip
      side="right"
      align="center"
      label={name}
    >
      <button
        onClick={handleServerIconClick}
        className="group relative flex items-center"
      >
        <div className={cn("absolute left-0 bg-primary rounded-r-full w-[4px] transition-all", params?.serverId !== id && "group-hover:h-[20px]", params?.serverId === id ? "h-[36px]" : "h-[8px]")} />
        <div className={cn("relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden", params?.serverId !== id && "bg-primary/10 text-primary rounded-[16px]")}>
          <Image
            src={imageUrl}
            alt="Channel"
            fill
          />
        </div>
      </button>
    </ActionTooltip>
  );
};

export default NavigationItem;
