"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { mockDrives } from "@/lib/mockData";

interface DriveListViewProps {
  status: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function DriveListView({ status }: DriveListViewProps) {
  // Filter drives based on status
  const filteredDrives = status === "all" 
    ? mockDrives 
    : mockDrives.filter(drive => drive.status === status);
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Recruitment Drives</CardTitle>
          <CardDescription>
            {status === "all" 
              ? "All recruitment drives" 
              : `${status.charAt(0).toUpperCase() + status.slice(1)} recruitment drives`}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        {filteredDrives.length > 0 ? (
          <div className="space-y-4">
            {filteredDrives.map((drive) => (
              <Link
                href={`/drives/${drive.id}`}
                key={drive.id}
                className="block"
              >
                <div
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1 mb-2 sm:mb-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{drive.title}</h4>
                      <Badge className={getStatusColor(drive.status)} variant="secondary">
                        {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      {drive.startDate} | {drive.company}
                    </p>
                  </div>
                  <div className="flex items-center w-full sm:w-auto justify-between sm:justify-start gap-6">
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Applications</p>
                      <p className="font-medium">{drive.candidatesApplied}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">Shortlisted</p>
                      <p className="font-medium">{drive.candidatesShortlisted}</p>
                    </div>
                    <div className="flex justify-center items-center ml-2">
                      <ChevronRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No {status} drives found.</p>
            <Button className="bg-blue-600" onClick={() => {/* Create drive function would go here */}}>
              Create New Drive
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}