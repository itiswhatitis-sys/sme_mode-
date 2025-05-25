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
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/dashboard/stat-card";
import { ChartCard } from "@/components/ui/dashboard/chart-card";
import { DriveCard } from "@/components/ui/dashboard/drive-card";
import { RecentActivity } from "@/components/ui/dashboard/recent-activity";
import { UpcomingEvents } from "@/components/ui/dashboard/upcoming-events";
import { mockDrives, mockAnalytics } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const data = [
  { department: 'CSE', Placed: 80, 'Not Placed': 20 },
  { department: 'IT', Placed: 70, 'Not Placed': 30 },
  { department: 'ECE', Placed: 60, 'Not Placed': 40 },
  { department: 'EEE', Placed: 50, 'Not Placed': 50 },
  { department: 'MECH', Placed: 30, 'Not Placed': 70 },
]
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
           An overview of your Placement activities
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
        <Card className="h-240 lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Placement Chart - Department-wise</CardTitle>
        <p className="text-sm text-muted-foreground">2024 Batch</p>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={data}  barCategoryGap={40}>
            <XAxis dataKey="department" />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="Placed" stackId="a" fill="#eb6841" />
            <Bar dataKey="Not Placed" stackId="a" fill="#f7b267" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
       <ChartCard
        title="Department Breakdown"
        type="pie"
        data={mockAnalytics.departmentBreakdown}
        height={240}
      />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  <div className="space-y-6 lg:col-span-3">
    <h2 className="text-xl font-semibold">Active Recruitment Drives</h2>
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockDrives
        .filter((drive) => drive.status === "active")
        .map((drive) => (
          <DriveCard key={drive.id} drive={drive} />
        ))}
    </div>
  </div>

  {/* Make UpcomingEvents span all 3 columns */}
  <div className="space-y-6 lg:col-span-3">
    <UpcomingEvents />
  </div>
</div>

      <div className="grid gap-6 md:grid-cols-2">
        <RecentActivity />
        <ChartCard
          title="Skill"
          type="pie"
          data={mockAnalytics.skillDistribution}
          height={300}
        />
      </div>
    </div>
  );
}