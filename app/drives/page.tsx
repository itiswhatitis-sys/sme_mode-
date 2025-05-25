"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar as CalendarIcon, Filter, List, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DriveCalendarView from "@/components/drives/DriveCalendarView";
import DriveListView from "@/components/drives/DriveListView";
import CreateDriveModal from "@/components/drives/CreateDriveModal";
import FilterDrivesModal from "@/components/drives/FilterDrivesModal";
import { useToast } from "@/hooks/use-toast";

export default function Drives() {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<"list" | "calendar">("list");
  const [createDriveModalOpen, setCreateDriveModalOpen] = useState(false);
  const [filterDrivesModalOpen, setFilterDrivesModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ongoing");
  const [appliedFilters, setAppliedFilters] = useState<any>(null);

  const handleFilterApply = (filters: any) => {
    setAppliedFilters(filters);
    toast({
      title: "Filters Applied",
      description: `Showing drives matching your criteria`
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Recruitment Drives</h1>
          <p className="text-muted-foreground mt-1">
            Manage and schedule your hiring campaigns
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-9"
            onClick={() => setFilterDrivesModalOpen(true)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <div className="border rounded-md p-1">
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-3"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "calendar" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 px-3"
              onClick={() => setViewMode("calendar")}
            >
              <CalendarIcon className="h-4 w-4" />
            </Button>
          </div>
          
          <Button className="bg-blue-600" onClick={() => setCreateDriveModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2 " />
            Create Drive
          </Button>
        </div>
      </div>
      
      <Tabs 
        value={activeTab}
        onValueChange={handleTabChange}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="ongoing">Ongoing</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All Drives</TabsTrigger>
        </TabsList>
        
        <TabsContent value="ongoing" className="space-y-4">
          {viewMode === "list" ? <DriveListView status="active" /> : <DriveCalendarView status="active" />}
        </TabsContent>
        
        <TabsContent value="upcoming" className="space-y-4">
          {viewMode === "list" ? <DriveListView status="upcoming" /> : <DriveCalendarView status="upcoming" />}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {viewMode === "list" ? <DriveListView status="completed" /> : <DriveCalendarView status="completed" />}
        </TabsContent>
        
        <TabsContent value="all" className="space-y-4">
          {viewMode === "list" ? <DriveListView status="all" /> : <DriveCalendarView status="all" />}
        </TabsContent>
      </Tabs>
      
      <CreateDriveModal isOpen={createDriveModalOpen} onClose={() => setCreateDriveModalOpen(false)} />
      <FilterDrivesModal 
        isOpen={filterDrivesModalOpen} 
        onClose={() => setFilterDrivesModalOpen(false)}
        onApplyFilters={handleFilterApply}
      />
    </div>
  );
}