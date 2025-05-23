"use client";

import React from "react";
import { Bell, Search, Menu, ChevronDown, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../mode-toggle";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";

import { cn } from "@/lib/utils"; // assuming you're using this utility
type TopNavbarProps = {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
};

export function TopNavbar({ onMenuClick, isSidebarOpen }: TopNavbarProps) {
    const [open, setOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      message: "Placement cell details",
      date: "02-01-2015",
      read: false,
    },
    {
      id: 2,
      message: "Drive ongoing results ",
      date: "02-01-2015",
      read: true,
    },
  ];

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-background px-4 shadow-sm">
      <Button
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        className="md:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="w-full flex items-center justify-between">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search candidates, jobs, assessments..."
            className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/2"
          />
        </div>

        <div className="flex items-center gap-4">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="text-primary border-primary/50 hover:bg-primary/10"
                  asChild
                >
                  <Link href="/terra">
                    <Bot className="h-5 w-5" />
                    <span className="sr-only">Terra AI Assistant</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Terra AI Assistant</TooltipContent>
            </Tooltip>
          </TooltipProvider> */}
 <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-foreground"
        onClick={() => setOpen(!open)}
      >
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notifications</span>
        <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600" />
      </Button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 rounded-md shadow-md border bg-white z-50">
          <div className="py-2">
            {notifications.map((n) => (
              <div
                key={n.id}
                className="px-4 py-2 flex items-start space-x-2 hover:bg-gray-50"
              >
                <span
                  className={cn(
                    "mt-1 h-2 w-2 rounded-full",
                    n.read ? "bg-green-500" : "bg-gray-400"
                  )}
                />
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-500">{n.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>

          <ModeToggle />
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button
      variant="ghost"
      className="flex items-center gap-2 hover:bg-transparent"
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://ui-avatars.com/api/?name=P&background=3b82f6&color=ffffff&bold=true&size=128" />
        <AvatarFallback>PA</AvatarFallback>
      </Avatar>
      {isSidebarOpen && (
        <>
          <div className="flex flex-col items-start text-sm md:flex">
            <span className="font-medium">Placement Admin</span>
            <span className="text-xs text-muted-foreground">
              Zoho Corp
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </>
      )}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-56">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuItem>Help & Support</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Log out</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
        </div>
      </div>
    </header>
  );
}