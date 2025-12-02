"use client";
import { RouteGroup } from "@/components/dashboard/route-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Apple, Boxes, ChevronLeft, Menu, Ruler, Utensils } from "lucide-react";
import { ReactNode, useState } from "react";

const ROUTE_GROUPS: RouteGroup[] = [
  {
    group: "Foods Management",
    items: [
      {
        href: "/admin/foods-management/foods",
        label: "Foods",
        icon: <Apple className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/categories",
        label: "Categories",
        icon: <Boxes className="mr-2 size-3" />,
      },
      {
        href: "/admin/foods-management/serving-units",
        label: "Serving Units",
        icon: <Ruler className="mr-2 size-3" />,
      },
    ],
  },
  {
    group: "Meals Management",
    items: [
      {
        href: "/client",
        label: "Meals",
        icon: <Utensils className="mr-2 size-3" />,
      },
    ],
  },
];

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      {/* Header */}
      <div
        className={
          "bg-background fixed z-10 flex h-14 w-screen items-center justify-between border px-2"
        }
      >
        <Collapsible.Root className="h-full" open={open} onOpenChange={setOpen}>
          <Collapsible.Trigger className="m-2" asChild>
            <Button size={"icon"} variant={"outline"}>
              <Menu />
            </Button>
          </Collapsible.Trigger>
        </Collapsible.Root>
      </div>

      {/* Sidebar */}
      <Collapsible.Root
        className="fixed top-0 left-0 z-20 h-dvh"
        open={open}
        onOpenChange={setOpen}
      >
        <Collapsible.Content forceMount>
          <div
            className={`bg-background fixed top-0 left-0 h-screen w-64 border p-4 transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex items-center justify-between">
              <h1 className="font-semibold">Admin Dashboard</h1>
              <Collapsible.Trigger asChild>
                <Button size={"icon"} variant={"outline"}>
                  <ChevronLeft />
                </Button>
              </Collapsible.Trigger>
            </div>

            <Separator className="my-2" />

            <div className="mt-4 flex flex-col">
              {ROUTE_GROUPS.map((routeGroup) => (
                <RouteGroup
                  key={routeGroup.group}
                  group={routeGroup.group}
                  items={routeGroup.items}
                />
              ))}
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>

      {/* Main content */}
      <main
        className={`mt-14 flex-1 p-4 transition-[margin] duration-300 ${open ? "ml-64" : "ml-0"}`}
      >
        {children}
      </main>
    </div>
  );
}
