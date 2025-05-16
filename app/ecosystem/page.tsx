"use client";

import React, { useState } from "react";
import { 
  Briefcase, 
  Calendar, 
  Users, 
  PlusCircle, 
  Filter, 
  Search 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DriveCard } from "@/components/ui/dashboard/drive-card";
import { StatCard } from "@/components/ui/dashboard/stat-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { mockDrives, mockCandidates } from "@/lib/mockData";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function EcosystemHiring() {
  const [selectedTab, setSelectedTab] = useState("drives");
  const [searchTerm, setSearchTerm] = useState("");
  type Candidate = typeof mockCandidates[number];
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  const filteredDrives = mockDrives.filter(drive => 
    drive.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    drive.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCandidates = mockCandidates.filter(candidate => 
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Group candidates by status for Kanban view
  const candidatesByStatus = {
    applied: filteredCandidates.filter(c => c.status === 'applied'),
    screening: filteredCandidates.filter(c => c.status === 'screening'),
    assessment: filteredCandidates.filter(c => c.status === 'assessment'),
    interview: filteredCandidates.filter(c => c.status === 'interview'),
    offer: filteredCandidates.filter(c => c.status === 'offer'),
    hired: filteredCandidates.filter(c => c.status === 'hired'),
  };

  type CandidateStatus = 'applied' | 'screening' | 'assessment' | 'interview' | 'offer' | 'hired' | 'rejected';
  
  const getStatusColor = (status: string) => {
    const colors: Record<CandidateStatus, string> = {
      applied: "bg-gray-100 text-gray-800",
      screening: "bg-blue-100 text-blue-800",
      assessment: "bg-amber-100 text-amber-800",
      interview: "bg-purple-100 text-purple-800",
      offer: "bg-green-100 text-green-800",
      hired: "bg-emerald-100 text-emerald-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status as CandidateStatus] || "bg-gray-100 text-gray-800";
  };

  const handleCandidateClick = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ecosystem Hiring</h1>
          <p className="text-muted-foreground">
            Manage campus recruitment drives and track candidates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Drive
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Active Drives"
          value={mockDrives.filter(d => d.status === 'active').length}
          icon={<Briefcase />}
          description="2 ending this month"
        />
        <StatCard
          title="Candidates in Pipeline"
          value={mockCandidates.filter(c => ['screening', 'assessment', 'interview'].includes(c.status)).length}
          icon={<Users />}
          trend="up"
          trendValue="15% this week"
        />
        <StatCard
          title="Upcoming Assessments"
          value={3}
          icon={<Calendar />}
          description="Next on June 20"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder={selectedTab === "drives" ? "Search drives..." : "Search candidates..."}
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="drives" className="space-y-4" onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="drives">Recruitment Drives</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Tracker</TabsTrigger>
        </TabsList>
        
        <TabsContent value="drives" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDrives.map((drive) => (
              <DriveCard key={drive.id} drive={drive} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="candidates">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Kanban board columns */}
            {Object.entries(candidatesByStatus).map(([status, candidates]) => (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium capitalize">{status}</h3>
                  <Badge variant="outline">{candidates.length}</Badge>
                </div>
                <div className="space-y-2 min-h-[200px]">
                  {candidates.map(candidate => (
                    <Dialog key={candidate.id}>
                      <DialogTrigger asChild>
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleCandidateClick(candidate)}
                        >
                          <CardContent className="p-3 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={candidate.avatar} />
                                <AvatarFallback>
                                  {candidate.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">{candidate.name}</p>
                                <p className="text-xs text-muted-foreground">{candidate.university}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {candidate.skills.slice(0, 2).map((skill, i) => (
                                <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                              ))}
                              {candidate.skills.length > 2 && (
                                <Badge variant="outline" className="text-xs">+{candidate.skills.length - 2}</Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Candidate Profile</DialogTitle>
                          <DialogDescription>View and manage candidate information</DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src={candidate.avatar} />
                              <AvatarFallback>
                                {candidate.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="text-lg font-medium">{candidate.name}</h3>
                              <p className="text-sm text-muted-foreground">{candidate.email}</p>
                              <Badge className={cn("mt-1", getStatusColor(candidate.status))}>
                                {candidate.status}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">University</p>
                              <p className="font-medium">{candidate.university}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Degree</p>
                              <p className="font-medium">{candidate.degree}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Phone</p>
                              <p className="font-medium">{candidate.phone}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Applied Date</p>
                              <p className="font-medium">{new Date(candidate.appliedDate).toLocaleDateString()}</p>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground mb-2">Skills</p>
                            <div className="flex flex-wrap gap-2">
                              {candidate.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary">{skill}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <DialogFooter className="flex space-x-2 justify-between">
                          <div className="space-x-2">
                            <Button variant="destructive" size="sm">Reject</Button>
                            <Button variant="outline" size="sm">
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule
                            </Button>
                          </div>
                          <Button>Move to Next Stage</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}