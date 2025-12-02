"use client";

import * as Collapsible from "@radix-ui/react-collapsible";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export type RouteGroup = {
  group: string;
  items: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};

type RouteGroupProps = RouteGroup;
export const RouteGroup = ({ group, items }: RouteGroupProps) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen}>
      <Collapsible.Trigger asChild>
        <Button
          className="text-foreground/80 flex w-full justify-between font-normal"
          variant={"ghost"}
        >
          {group}
          <motion.div
            className={`flex flex-col gap-2`}
            animate={{ rotate: open ? 180 : 0 }}
          >
            <ChevronDown />
          </motion.div>
        </Button>
      </Collapsible.Trigger>
      <Collapsible.Content forceMount>
        <motion.div
          className={`flex flex-col gap-2 ${!open ? "pointer-events-none" : ""}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          {items.map((item) => (
            <Button
              className="w-full justify-start font-normal"
              variant={"link"}
              asChild
              key={item.href}
            >
              <Link
                href={item.href}
                className={`flex items-center rounded-md px-5 py-1 transition-all ${pathname.startsWith(item.href) ? "bg-foreground/10 hover:bg-foreground/5" : "hover:bg-foreground/10"}`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            </Button>
          ))}
        </motion.div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
