"use client";

import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const ServerSearch = ({ data }: ServerSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(prev => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      const input = document.querySelector("input");
      if (input) input.focus();
    }
  }, [open]);

  function onClick({ id, type }: { id: string; type: "channel" | "member" }) {
    setOpen(false);

    if (type === "member") {
      return router.push(`/servers/${params?.serverId}/conversations/${id}`);
    }

    if (type == "channel") {
      return router.push(`/servers/${params?.serverId}/channels/${id}`);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
        <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
        <p className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">Search</p>
        <kbd className="pointer-events-none flex h-5 select-none items-center gap-1 rounded-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
          <span className="text-xs">CTRL</span>k
        </kbd>
      </button>

      <CommandDialog
        open={open}
        onOpenChange={isOpen => setOpen(isOpen)}
      >
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>No Results Found</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup
                key={label}
                heading={label}
              >
                {data?.map(({ id, icon, name }) => (
                  <CommandItem
                    key={id}
                    onSelect={() => onClick({ id, type })}
                    className="cursor-pointer"
                  >
                    {icon}
                    <span>{name}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default ServerSearch;
