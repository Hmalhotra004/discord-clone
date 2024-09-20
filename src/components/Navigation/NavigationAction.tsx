"use client";

import ActionTooltip from "@/components/ActionTooltip";
import useModal from "@/hooks/useModal";
import { Plus } from "lucide-react";

const NavigationAction = () => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionTooltip
        side="right"
        align="center"
        label="Add a server"
      >
        <button
          className="group flex items-center"
          onClick={() => onOpen("createServer")}
        >
          <div
            className={`flex mx-3 h-[48px] w-[48px] rounded-[24px] overflow-hidden items-center justify-center
                      group-hover:rounded-[16px] bg-background dark:bg-neutral-700 group-hover:bg-emerald-500 transition-all`}
          >
            <Plus
              className="group-hover:text-white transition text-emerald-500"
              size={25}
            />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
};

export default NavigationAction;
