import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  type: "drive" | "interview" | "assessment" | "meeting";
  date: Date;
  time: string;
  location: string;
  participants: number;
}

const events: Event[] = [
  {
    id: "1",
    title: "Technical Interview Round",
    type: "interview",
    date: new Date(2023, 5, 18),
    time: "10:00 AM - 12:00 PM",
    location: "Virtual (Zoom)",
    participants: 5,
  },
  {
    id: "2",
    title: "Coding Assessment",
    type: "assessment",
    date: new Date(2023, 5, 20),
    time: "2:00 PM - 4:00 PM",
    location: "Online",
    participants: 25,
  },
  {
    id: "3",
    title: "AI/ML Engineer Campus Drive",
    type: "drive",
    date: new Date(2023, 5, 25),
    time: "9:00 AM - 5:00 PM",
    location: "SRM University, Chennai",
    participants: 50,
  },
  {
    id: "4",
    title: "HR Team Weekly Meeting",
    type: "meeting",
    date: new Date(2023, 5, 17),
    time: "11:00 AM - 12:00 PM",
    location: "Conference Room A",
    participants: 8,
  },
];

export function UpcomingEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {events.map((event) => (
          <Card
            key={event.id}
            className="overflow-hidden border border-muted hover:border-muted-foreground/20 transition-colors"
          >
            <div className="flex">
              <div className="w-2 bg-primary" />
              <div className="p-4 w-full">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge
                      variant="outline"
                      className={cn(
                        "capitalize",
                        event.type === "interview" && "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200",
                        event.type === "assessment" && "bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200",
                        event.type === "drive" && "bg-green-50 text-green-700 hover:bg-green-50 border-green-200",
                        event.type === "meeting" && "bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200"
                      )}
                    >
                      {event.type}
                    </Badge>
                  </div>
                  <div className="text-sm font-medium flex items-center bg-muted rounded-md px-2 py-1">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                    {format(event.date, "MMM d")}
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3.5 w-3.5 mr-1" />
                    {event.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1" />
                    {event.participants} Participants
                  </div>
                  <div className="flex items-center col-span-2">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
}