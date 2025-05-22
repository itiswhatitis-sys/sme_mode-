"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Users,
  BarChart2,
  FileText,
  Calendar,
  Building2,
  UserPlus,
  Briefcase,
  BookOpen,
  ChevronLeft,
  Layers,
  Home,
  Award,
  Bot,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";

type SidebarProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      title: "Dashboard",
      href: "/",
      icon: Home,
      section: "general",
    },
    // {
    //   title: "Ecosystem Hiring",
    //   href: "/ecosystem",
    //   icon: Briefcase,
    //   section: "hiring",
    // },
    // {
    //   title: "Non-Ecosystem",
    //   href: "/non-ecosystem",
    //   icon: Building2,
    //   section: "hiring",
    // },
    // {
    //   title: "Lateral Hiring",
    //   href: "/lateral",
    //   icon: Bot,
    //   section: "hiring",
    // },
    {
      title: "Assessments",
      href: "/assessments",
      icon: BookOpen,
      section: "tools",
    },
    {
      title: "Recruitment Drives",
      href: "/drives",
      icon: Award,
      section: "tools",
    },
    {
      title: "Candidates",
      href: "/candidates",
      icon: Users,
      section: "tools",
    },
    {
      title: "Applications",
      href: "/applications",
      icon: FileText,
      section: "tools",
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: Calendar,
      section: "tools",
    },
     {
      title: "Interboard",
      href: "/interboard",
      icon:  Briefcase,
      section: "tools",
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: BarChart2,
      section: "tools",
    }
  ];

  const sections = [
    { id: "general", title: "General" },
    // { id: "hiring", title: "Hiring Models" },
    { id: "tools", title: "Tools" },
  ];

  return (
    <div
      className={cn(
        "fixed h-screen bg-white shadow-sm transition-all duration-300 dark:bg-gray-950 z-30 overflow-y-auto",
        open ? "w-64" : "w-20"
      )}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          {open ? (
            <div className="flex items-center">
              <Layers className="h-6 w-6 text-blue-700" />
              <span className="ml-2 font-semibold text-lg">SME Hiring</span>
            </div>
          ) : (
            <Layers className="h-6 w-6 text-blue-700 mx-auto" />
          )}
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100"
        >
          <ChevronLeft
            className={cn(
              "h-5 w-5 transition-all duration-300",
              !open && "rotate-180"
            )}
          />
        </button>
      </div>

      <div className="space-y-4 py-4">
        {sections.map((section) => (
          <div key={section.id} className="px-3 py-2">
            {open && (
              <h3 className="mb-2 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                {section.title}
              </h3>
            )}
            <nav className="space-y-1">
              {routes
                .filter((route) => route.section === section.id)
                .map((route, index) => (
                  <TooltipProvider key={index} delayDuration={0}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link
                          href={route.href}
                          className={cn(
                            "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                            pathname === route.href
                              ? "bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-50"
                              : "text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800",
                            !open && "justify-center px-2"
                          )}
                        >
                          <route.icon
                            className={cn(
                              "h-5 w-5 flex-shrink-0",
                              pathname === route.href
                                ? "text-blue-700"
                                : "text-gray-500"
                            )}
                          />
                          {open && (
                            <span className="ml-3 truncate">{route.title}</span>
                          )}
                        </Link>
                      </TooltipTrigger>
                      {!open && (
                        <TooltipContent side="right">
                          {route.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
            </nav>
            {open && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
}