import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface Activity {
  id: string;
  user: {
    name: string;
    avatar: string;
    role: string;
  };
  action: string;
  target: string;
  date: Date;
}

const activities: Activity[] = [
  {
    id: "1",
    user: {
      name: "Arun Kumar",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
      role: "HR Manager",
    },
    action: "created",
    target: "Software Developer Campus Drive",
    date: new Date(2023, 5, 15, 14, 30),
  },
  {
    id: "2",
    user: {
      name: "Priya Desai",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      role: "Recruiter",
    },
    action: "scheduled",
    target: "Technical Interview for Java Developer position",
    date: new Date(2023, 5, 15, 10, 15),
  },
  {
    id: "3",
    user: {
      name: "Rahul Sharma",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
      role: "HR Executive",
    },
    action: "approved",
    target: "5 candidates for the next round",
    date: new Date(2023, 5, 14, 16, 45),
  },
  {
    id: "4",
    user: {
      name: "Arun Kumar",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
      role: "HR Manager",
    },
    action: "sent",
    target: "offer letters to 3 candidates",
    date: new Date(2023, 5, 14, 11, 20),
  },
  {
    id: "5",
    user: {
      name: "Priya Desai",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
      role: "Recruiter",
    },
    action: "created",
    target: "a new assessment for Frontend Developer role",
    date: new Date(2023, 5, 13, 15, 30),
  },
];

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-4 rounded-lg border p-3 transition-all hover:bg-secondary/20"
          >
            <Avatar>
              <AvatarImage src={activity.user.avatar} />
              <AvatarFallback>
                {activity.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.user.name}{" "}
                <span className="text-muted-foreground">
                  {activity.action}
                </span>{" "}
                {activity.target}
              </p>
              <div className="flex items-center text-xs text-muted-foreground">
                <span>{format(activity.date, "MMM d, h:mm a")}</span>
                <span className="mx-1">•</span>
                <span>{activity.user.role}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}