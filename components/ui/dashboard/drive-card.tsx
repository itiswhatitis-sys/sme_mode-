import React from "react";
import { Drive } from "@/lib/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DriveCardProps {
  drive: Drive;
  onClick?: () => void;
}

export function DriveCard({ drive, onClick }: DriveCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-50 text-green-700 hover:bg-green-50 border-green-200";
      case "draft":
        return "bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200";
      case "completed":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-700 hover:bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  // Calculate progress
  const totalRounds = drive.rounds.length;
  const completedRounds = drive.rounds.filter(
    (round) => round.status === "completed"
  ).length;
  const progress = totalRounds ? (completedRounds / totalRounds) * 100 : 0;

  const startDate = new Date(drive.startDate);
  const endDate = new Date(drive.endDate);

  return (
    <Card
      className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="p-4 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10 rounded-md">
                <AvatarImage src={drive.logo} alt={drive.company} />
                <AvatarFallback className="rounded-md">
                  {drive.company.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{drive.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {drive.company}
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn("capitalize", getStatusColor(drive.status))}
            >
              {drive.status}
            </Badge>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex items-center text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {drive.location}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              {`${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`}
            </div>
            <div className="flex items-center text-muted-foreground">
              <Users className="mr-1 h-4 w-4" />
              {drive.positions} Positions
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Progress</span>
              <span className="text-muted-foreground">{`${completedRounds}/${totalRounds} Rounds`}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-sm">
            <div className="rounded-md bg-muted p-2">
              <div className="font-medium">{drive.candidatesApplied}</div>
              <div className="text-xs text-muted-foreground">Applications</div>
            </div>
            <div className="rounded-md bg-muted p-2">
              <div className="font-medium">{drive.candidatesShortlisted}</div>
              <div className="text-xs text-muted-foreground">Shortlisted</div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted p-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {drive.rounds.slice(0, 3).map((round, index) => (
            <div
              key={index}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-xs"
              title={round.name}
            >
              {round.status === "completed" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                index + 1
              )}
            </div>
          ))}
          {drive.rounds.length > 3 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background text-xs">
              +{drive.rounds.length - 3}
            </div>
          )}
        </div>
        <Button variant="ghost" size="sm" className="text-primary">
          <span>Details</span>
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}