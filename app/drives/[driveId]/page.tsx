import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, FileText, User, Users, Building, MapPin, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { mockDrives } from "@/lib/mockData";

// This function is required for static export with dynamic routes
export async function generateStaticParams() {
  // Return a list of possible values for driveId
  return mockDrives.map((drive) => ({
    driveId: drive.id,
  }));
}

interface DriveDetailsProps {
  params: {
    driveId: string;
  };
}

export default function DriveDetails({ params }: DriveDetailsProps) {
  const { driveId } = params;
  
  // Find the drive in mock data
  const drive = mockDrives.find(d => d.id === driveId) || {
    id: driveId,
    title: "Software Developer Campus Drive",
    company: "Zoho Corporation",
    description: "Recruitment drive for entry-level software developers with strong programming fundamentals and problem-solving skills.",
    location: "Bangalore, India",
    startDate: "2023-05-15",
    endDate: "2023-06-15",
    status: "active",
    positions: 15,
    candidatesApplied: 148,
    candidatesShortlisted: 48,
    rounds: [
      {
        id: "1-1",
        name: "Resume Screening",
        type: "screening",
        date: "2023-05-15",
        duration: 7,
        status: "completed",
        candidatesCount: 148
      },
      {
        id: "1-2",
        name: "Online Assessment",
        type: "assessment",
        date: "2023-05-25",
        duration: 3,
        status: "ongoing",
        candidatesCount: 75
      },
      {
        id: "1-3",
        name: "Technical Interview",
        type: "interview",
        date: "2023-06-01",
        duration: 2,
        status: "pending",
        candidatesCount: 0
      },
      {
        id: "1-4",
        name: "HR Interview",
        type: "hr",
        date: "2023-06-10",
        duration: 3,
        status: "pending",
        candidatesCount: 0
      }
    ],
    logo: "https://i.imgur.com/iW1QN5j.png"
  };
  
  // Mock data for top candidates
  const topCandidates = [
    { name: "Amit Kumar", college: "Computer Science", score: 92, avatar: "AK" },
    { name: "Priya Singh", college: "Information Technology", score: 88, avatar: "PS" },
    { name: "Raj Patel", college: "Computer Engineering", score: 85, avatar: "RP" }
  ];
  
  // Mock data for timeline
  const timeline = [
    { date: "Apr 28, 2023", event: "Drive Created" },
    { date: "May 2, 2023", event: "Applications Open" },
    { date: "May 10, 2023", event: "Applications Close" },
    { date: "May 12, 2023", event: "Resume Screening Complete" },
    { date: "May 15, 2023", event: "Online Assessment" },
    { date: "May 18, 2023", event: "Technical Interviews" },
    { date: "May 20, 2023", event: "HR Interviews" },
    { date: "May 25, 2023", event: "Offers Released" }
  ];
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center">
          <Link href="/drives">
            <Button variant="ghost" className="mr-2 p-0 h-8 w-8">
              <ChevronLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{drive.title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(drive.status)} variant="secondary">
                {drive.status.charAt(0).toUpperCase() + drive.status.slice(1)}
              </Badge>
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-3.5 w-3.5 mr-1" />
                {drive.startDate}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button className="bg-blue-600">
            <User className="h-4 w-4 mr-2" />
            View Candidates
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Drive Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Building className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Company</p>
                  <p className="text-sm text-muted-foreground">{drive.company}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{drive.location}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Job Details</p>
                  <p className="text-sm text-muted-foreground">Full Time • Entry Level</p>
                  <p className="text-sm text-muted-foreground">Package: ₹6-8 LPA</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Required Skills</p>
                <div className="flex flex-wrap gap-1">
                  {["JavaScript", "React", "Node.js", "Problem Solving", "Data Structures"].map((skill, index) => (
                    <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center py-2 space-y-1">
                <p className="text-4xl font-bold text-primary">{drive.candidatesApplied}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-2 rounded-md bg-secondary/30">
                  <p className="text-2xl font-bold">{drive.candidatesShortlisted}</p>
                  <p className="text-xs text-muted-foreground">Shortlisted</p>
                </div>
                <div className="p-2 rounded-md bg-secondary/30">
                  <p className="text-2xl font-bold">{drive.positions}</p>
                  <p className="text-xs text-muted-foreground">Positions</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Applications processed</span>
                  <span className="font-medium">75%</span>
                </div>
                <Progress value={75} className="h-1" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Top Candidates</CardTitle>
            <CardDescription>Based on current assessment scores</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCandidates.map((candidate, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-md bg-secondary/20">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarFallback>{candidate.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{candidate.name}</p>
                    <p className="text-xs text-muted-foreground">{candidate.college}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">{candidate.score}%</p>
                    <p className="text-xs text-muted-foreground">Score</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                View All Candidates
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="rounds" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rounds">Assessment Rounds</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="candidates">Candidates</TabsTrigger>
          <TabsTrigger value="details">Full Details</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rounds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Assessment Workflow</CardTitle>
              <CardDescription>Current progress of assessment rounds</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {drive.rounds.map((round, index) => (
                  <div key={round.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-3 text-xs ${
                          round.status === 'completed' ? 'bg-green-500 text-white' :
                          round.status === 'ongoing' ? 'bg-blue-500 text-white' :
                          'border border-gray-300 text-gray-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{round.name}</p>
                          <Badge className={getStatusColor(round.status)} variant="secondary">
                            {round.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button 
                        variant={round.status === 'pending' ? 'outline' : 'default'} 
                        size="sm"
                        className="bg-blue-600"
                        disabled={round.status === 'pending'}
                      >
                        {round.status === 'completed' ? 'View Results' : 
                        round.status === 'ongoing' ? 'Manage Round' : 'Start Round'}
                      </Button>
                    </div>
                    <Progress value={round.status === 'completed' ? 100 : round.status === 'ongoing' ? 50 : 0} className="h-1" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="timeline" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Drive Timeline</CardTitle>
              <CardDescription>Key dates and events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 relative before:absolute before:inset-0 before:left-[1.3rem] before:h-full before:w-0.5 before:bg-border before:ml-0.5">
                {timeline.map((item, index) => (
                  <div key={index} className="flex gap-4 relative">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center z-10 ${
                      index === 0 ? 'bg-primary text-primary-foreground' :
                      index < 5 ? 'bg-green-100 text-green-800 border border-green-300' :
                      'bg-white border border-gray-200'
                    }`}>
                      <Calendar className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="font-medium">{item.event}</p>
                      <p className="text-sm text-muted-foreground">{item.date}</p>
                    </div>
                    {index < 5 && (
                      <Badge className="absolute right-0" variant={index < 5 ? "default" : "outline"}>
                        {index < 5 ? "Completed" : "Upcoming"}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-lg font-medium">Candidates</CardTitle>
                  <CardDescription>All applicants for this drive</CardDescription>
                </div>
                <Button className="bg-blue-600">
                  <FileText className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Candidate table view will be implemented here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-medium">Drive Details</CardTitle>
              <CardDescription>Complete information about this recruitment drive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{drive.description}</p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Job Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Strong programming fundamentals in at least one language</li>
                    <li>Knowledge of data structures and algorithms</li>
                    <li>Experience with web development technologies</li>
                    <li>Good problem-solving skills</li>
                    <li>Effective communication skills</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Education Requirements</h3>
                  <p className="text-sm text-muted-foreground">
                    Bachelors degree in Computer Science, Information Technology or related field.
                    Minimum CGPA of 7.5 or 70% aggregate marks.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-md font-medium mb-2">Selection Process</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Resume Screening</li>
                    <li>Online Assessment (Coding & Aptitude)</li>
                    <li>Technical Interview</li>
                    <li>HR Interview</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}