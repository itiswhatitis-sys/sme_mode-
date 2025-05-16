"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { mockDrives } from "@/lib/mockData";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface DriveCalendarViewProps {
  status: string;
}

export default function DriveCalendarView({ status }: DriveCalendarViewProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Convert mockDrives to calendar events
  const events = mockDrives.map(drive => ({
    id: drive.id,
    title: drive.title,
    date: new Date(drive.startDate), 
    company: drive.company,
    status: drive.status
  }));

  // Filter events based on status
  const filteredEvents = status === "all" 
    ? events 
    : events.filter(event => event.status === status);
  
  // Generate a map of dates to event counts for highlighting days with events
  const eventDates = filteredEvents.reduce((acc, event) => {
    const dateString = event.date.toDateString();
    acc[dateString] = (acc[dateString] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-7">
          <div className="md:col-span-5 p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm"
              modifiersStyles={{
                selected: {
                  backgroundColor: 'hsl(var(--primary))',
                  color: 'white'
                }
              }}
              modifiers={{
                event: (day) => {
                  return !!eventDates[day.toDateString()];
                }
              }}
              modifiersClassNames={{
                event: "font-bold border-2 border-primary"
              }}
            />
          </div>
          
          <div className="md:col-span-2 border-t md:border-t-0 md:border-l p-4 bg-secondary/20">
            <h3 className="font-medium mb-4">Events for {date?.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</h3>
            
            {filteredEvents.filter(event => 
              event.date.toDateString() === date?.toDateString()
            ).length > 0 ? (
              <div className="space-y-3">
                {filteredEvents
                  .filter(event => event.date.toDateString() === date?.toDateString())
                  .map(event => (
                    <div key={event.id} className="p-3 bg-background border rounded-md">
                      <h4 className="font-medium text-sm">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{event.company}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          event.status === 'completed' ? 'bg-green-100 text-green-800' :
                          event.status === 'draft' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                        <Link href={`/drives/${event.id}`}>
                          <Button variant="ghost" size="sm" className="h-7 text-xs">View</Button>
                        </Link>
                      </div>
                    </div>
                  ))
                }
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No events scheduled for this date.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}