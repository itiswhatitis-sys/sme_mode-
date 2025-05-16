"use client";

import React from "react";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  LineChart, 
  Clock, 
  FileCheck, 
  UserPlus, 
  Award 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/dashboard/stat-card";
import { ChartCard } from "@/components/ui/dashboard/chart-card";
import { DriveCard } from "@/components/ui/dashboard/drive-card";
import { RecentActivity } from "@/components/ui/dashboard/recent-activity";
import { UpcomingEvents } from "@/components/ui/dashboard/upcoming-events";
import { mockDrives, mockAnalytics } from "@/lib/mockData";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            An overview of your recruitment activities
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>Create Drive</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Drives"
          value={mockDrives.filter((d) => d.status === "active").length}
          icon={<Briefcase />}
          trend="up"
          trendValue="2 this week"
        />
        <StatCard
          title="Total Candidates"
          value={563}
          icon={<Users />}
          trend="up"
          trendValue="12% this month"
        />
        <StatCard
          title="Upcoming Interviews"
          value={8}
          icon={<Calendar />}
          description="Next interview in 2 days"
        />
        <StatCard
          title="Avg Time to Hire"
          value="28 days"
          icon={<Clock />}
          trend="down"
          trendValue="4 days improvement"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ChartCard
          title="Monthly Hires"
          type="bar"
          data={mockAnalytics.monthlyHires}
          height={240}
          className="lg:col-span-2"
        />
        <ChartCard
          title="Source Breakdown"
          type="pie"
          data={mockAnalytics.sourceBreakdown}
          height={240}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <h2 className="text-xl font-semibold">Active Recruitment Drives</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {mockDrives
              .filter((drive) => drive.status === "active")
              .map((drive) => (
                <DriveCard key={drive.id} drive={drive} />
              ))}
          </div>
        </div>

        <div className="space-y-6">
          <UpcomingEvents />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <ChartCard
          title="Skill Distribution"
          type="pie"
          data={mockAnalytics.skillDistribution}
          height={300}
        />
      </div>
    </div>
  );
}