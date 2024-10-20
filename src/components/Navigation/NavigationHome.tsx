"use client";
import ActionTooltip from "@/components/ActionTooltip";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationHome = () => {
  const pathname = usePathname();
  return (
    <div>
      <ActionTooltip
        side="right"
        align="center"
        label="Direct Messages"
      >
        <Link
          href="/"
          className="group flex items-center"
        >
          <div className={cn("absolute left-0 bg-primary rounded-r-full w-[4px] transition-all", pathname !== "/" && "group-hover:h-[20px]", pathname === "/" ? "h-[36px]" : "h-[0px]")} />
          <div
            className={`flex mx-3 h-[48px] w-[48px] rounded-[24px] overflow-hidden items-center justify-cente bg-background
                      group-hover:rounded-[16px] dark:bg-neutral-700 group-hover:bg-discord transition-all`}
          >
            <Image
              src="/dc.png"
              alt="discordIcon"
              width={1000}
              height={1000}
            />
          </div>
        </Link>
      </ActionTooltip>
    </div>
  );
};

export default NavigationHome;
