"use client";

import React, { useState } from "react";
import { 
  Link, 
  QrCode, 
  Share, 
  Copy, 
  LineChart, 
  BarChart4, 
  PieChart, 
  Download, 
  Search, 
  Filter, 
  RefreshCw, 
  ExternalLink,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatCard } from "@/components/ui/dashboard/stat-card";
import { ChartCard } from "@/components/ui/dashboard/chart-card";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { mockAnalytics } from "@/lib/mockData";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function NonEcosystemHiring() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Dummy application links
  const applicationLinks = [
    {
      id: "1",
      position: "Software Engineer",
      url: "https://sme-hiring.com/apply/se-001",
      createdDate: "2023-05-10",
      expiryDate: "2023-06-10",
      views: 245,
      applications: 72,
      status: "active",
    },
    {
      id: "2",
      position: "UX Designer",
      url: "https://sme-hiring.com/apply/ux-001",
      createdDate: "2023-05-15",
      expiryDate: "2023-06-15",
      views: 189,
      applications: 34,
      status: "active",
    },
    {
      id: "3",
      position: "Product Manager",
      url: "https://sme-hiring.com/apply/pm-001",
      createdDate: "2023-04-20",
      expiryDate: "2023-05-20",
      views: 302,
      applications: 45,
      status: "expired",
    },
    {
      id: "4",
      position: "Data Scientist",
      url: "https://sme-hiring.com/apply/ds-001",
      createdDate: "2023-05-05",
      expiryDate: "2023-06-05",
      views: 157,
      applications: 28,
      status: "active",
    },
  ];

  // Dummy applicants data
  const applicants = [
    {
      id: "1",
      name: "Vikram Singh",
      position: "Software Engineer",
      email: "vikram.singh@gmail.com",
      phone: "+91 9876543214",
      applyDate: "2023-05-12",
      status: "shortlisted",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "2",
      name: "Ananya Desai",
      position: "UX Designer",
      email: "ananya.desai@gmail.com",
      phone: "+91 9876543215",
      applyDate: "2023-05-16",
      status: "new",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "3",
      name: "Rahul Sharma",
      position: "Software Engineer",
      email: "rahul.sharma@gmail.com",
      phone: "+91 9876543210",
      applyDate: "2023-05-13",
      status: "reviewing",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "4",
      name: "Priya Patel",
      position: "Data Scientist",
      email: "priya.patel@gmail.com",
      phone: "+91 9876543211",
      applyDate: "2023-05-08",
      status: "rejected",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      id: "5",
      name: "Arun Kumar",
      position: "Software Engineer",
      email: "arun.kumar@gmail.com",
      phone: "+91 9876543212",
      applyDate: "2023-05-14",
      status: "interviewing",
      avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  // Filter applicants based on search term
  const filteredApplicants = applicants.filter(applicant => 
    applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    applicant.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.PromiseLikeOfReactNode | null | undefined) => {
    const statusStyles: Record<string, string> = {
      active: "bg-green-50 text-green-700 border-green-200",
      expired: "bg-red-50 text-red-700 border-red-200",
      new: "bg-blue-50 text-blue-700 border-blue-200",
      reviewing: "bg-amber-50 text-amber-700 border-amber-200",
      shortlisted: "bg-green-50 text-green-700 border-green-200",
      interviewing: "bg-purple-50 text-purple-700 border-purple-200",
      rejected: "bg-red-50 text-red-700 border-red-200",
    };
    
    return (
      <Badge variant="outline" className={statusStyles[status as string] || ""}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Non-Ecosystem Hiring</h1>
          <p className="text-muted-foreground">
            Create application links and manage candidates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Link className="mr-2 h-4 w-4" />
            Create Application Link
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={mockAnalytics.applicationsCount}
          icon={<LineChart />}
          trend="up"
          trendValue="8% this month"
        />
        <StatCard
          title="Active Links"
          value={applicationLinks.filter(link => link.status === "active").length}
          icon={<Link />}
          description="3 active application portals"
        />
        <StatCard
          title="Conversion Rate"
          value="23.4%"
          icon={<BarChart4 />}
          trend="up"
          trendValue="2.1% improvement"
        />
        <StatCard
          title="New Applicants"
          value={15}
          icon={<PieChart />}
          description="Last 7 days"
        />
      </div>

      <Tabs defaultValue="links" className="space-y-4">
        <TabsList>
          <TabsTrigger value="links">Application Links</TabsTrigger>
          <TabsTrigger value="applicants">Applicants</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="links" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search links..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Position</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Applications</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicationLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium">{link.position}</TableCell>
                    <TableCell className="font-medium text-sm text-blue-600">
                      <div className="flex items-center space-x-2">
                        <span className="truncate max-w-[150px]">{link.url}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(link.createdDate).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(link.expiryDate).toLocaleDateString()}</TableCell>
                    <TableCell>{link.views}</TableCell>
                    <TableCell>{link.applications}</TableCell>
                    <TableCell>{getStatusBadge(link.status)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <svg
                              width="15"
                              height="15"
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                            >
                              <path
                                d="M3.625 7.5C3.625 8.12132 3.12132 8.625 2.5 8.625C1.87868 8.625 1.375 8.12132 1.375 7.5C1.375 6.87868 1.87868 6.375 2.5 6.375C3.12132 6.375 3.625 6.87868 3.625 7.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM13.625 7.5C13.625 8.12132 13.1213 8.625 12.5 8.625C11.8787 8.625 11.375 8.12132 11.375 7.5C11.375 6.87868 11.8787 6.375 12.5 6.375C13.1213 6.375 13.625 6.87868 13.625 7.5Z"
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Share className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <QrCode className="mr-2 h-4 w-4" />
                            Generate QR Code
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Applicants
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="border-dashed border-2 cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors">
                <CardContent className="flex flex-col items-center justify-center py-6 px-8">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Link className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-3 font-medium">Create New Application Link</h3>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Generate a custom application link for any job opening
                  </p>
                </CardContent>
              </Card>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Application Link</DialogTitle>
                <DialogDescription>
                  Configure the details for your new job application link
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Position</label>
                  <Input placeholder="e.g., Software Engineer" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Expiry Date</label>
                    <Input type="date" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Input placeholder="e.g., Engineering" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Job Description</label>
                  <textarea
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter job description..."
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button>Create Link</Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="applicants" className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search applicants..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Applied On</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplicants.map((applicant) => (
                  <TableRow key={applicant.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={applicant.avatar} />
                          <AvatarFallback>
                            {applicant.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{applicant.name}</div>
                          <div className="text-sm text-muted-foreground">{applicant.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{applicant.position}</TableCell>
                    <TableCell>{new Date(applicant.applyDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(applicant.status)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">View</Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="mr-1 h-3.5 w-3.5" />
                          Schedule
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ChartCard
              title="Applications Over Time"
              type="line"
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
          
          <div className="grid gap-6 md:grid-cols-2">
            <ChartCard
              title="Skill Distribution"
              type="bar"
              data={mockAnalytics.skillDistribution}
              height={300}
            />
            <ChartCard
              title="Assessment Completion"
              type="pie"
              data={mockAnalytics.assessmentCompletion}
              height={300}
            />
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Application Funnel</CardTitle>
                <CardDescription>Conversion at each stage</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <div className="space-y-2">
                  <div className="rounded-t-md bg-blue-500 text-white p-2">
                    <div className="font-medium">Applications</div>
                    <div className="text-2xl font-bold">563</div>
                  </div>
                  <div className="bg-blue-400 text-white p-2">
                    <div className="font-medium">Shortlisted</div>
                    <div className="text-2xl font-bold">213</div>
                  </div>
                  <div className="bg-blue-300 text-blue-900 p-2">
                    <div className="font-medium">Interviewed</div>
                    <div className="text-2xl font-bold">128</div>
                  </div>
                  <div className="rounded-b-md bg-blue-200 text-blue-900 p-2">
                    <div className="font-medium">Offers</div>
                    <div className="text-2xl font-bold">42</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                <div className="mx-auto">7.5% overall conversion rate</div>
              </CardFooter>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key recruitment statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Time to Hire</p>
                      <p className="text-2xl font-bold">28 days</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Cost per Hire</p>
                      <p className="text-2xl font-bold">₹15,250</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">Offer Acceptance</p>
                      <p className="text-2xl font-bold">85%</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Application to Interview</p>
                      <p className="text-sm font-medium">22.7%</p>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
                      <div className="absolute h-full w-[22.7%] bg-primary rounded-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Interview to Offer</p>
                      <p className="text-sm font-medium">32.8%</p>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
                      <div className="absolute h-full w-[32.8%] bg-primary rounded-full" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">Offer to Acceptance</p>
                      <p className="text-sm font-medium">85%</p>
                    </div>
                    <div className="relative h-2 w-full overflow-hidden rounded-full bg-primary/20">
                      <div className="absolute h-full w-[85%] bg-primary rounded-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}