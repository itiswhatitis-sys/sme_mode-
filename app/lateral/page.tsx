"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  MessageSquare,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Star,
  Bot,
  Sparkles,
  Briefcase,
  GraduationCap,
  Calendar,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockAICandidates } from "@/lib/mockData";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function LateralHiring() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState(mockAICandidates[0]);
  const [matchThreshold, setMatchThreshold] = useState(70);
  
  // Filter candidates based on search and match threshold
  const filteredCandidates = mockAICandidates.filter(candidate => 
    (candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.currentCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    candidate.matchScore >= matchThreshold
  );

  // Skills we're looking for
  const requiredSkills = [
    "Java", "Spring Boot", "Microservices", "AWS", "Python", 
    "React", "Node.js", "DevOps", "Docker", "Kubernetes"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lateral Hiring</h1>
          <p className="text-muted-foreground">
            AI-powered candidate sourcing with Terra AI
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Save Search
          </Button>
        </div>
      </div>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-blue-100 p-3 dark:bg-blue-900">
              <Bot className="h-6 w-6 text-blue-700 dark:text-blue-300" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Terra AI</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered talent sourcing and matching
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for skills, job titles, companies..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div>
                <Label className="text-xs">Match Score: {matchThreshold}%+</Label>
                <Slider
                  value={[matchThreshold]}
                  min={0}
                  max={100}
                  step={5}
                  className="w-32"
                  onValueChange={(value) => setMatchThreshold(value[0])}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button className="bg-blue-700 hover:bg-blue-800">
                <Sparkles className="mr-2 h-4 w-4" />
                Find Candidates
              </Button>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {requiredSkills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="bg-white dark:bg-gray-900"
              >
                <Checkbox id={`skill-${index}`} className="mr-2 h-3.5 w-3.5" />
                {skill}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Matched Candidates</CardTitle>
              <CardDescription>
                {filteredCandidates.length} candidates found matching your criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {filteredCandidates.map((candidate) => (
                  <div
                    key={candidate.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-accent/50 ${
                      selectedCandidate.id === candidate.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedCandidate(candidate)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={candidate.avatar} />
                          <AvatarFallback>
                            {candidate.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{candidate.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {candidate.currentRole} at {candidate.currentCompany}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {candidate.skills.slice(0, 2).map((skill, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {candidate.skills.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{candidate.skills.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200">
                          {candidate.matchScore}% Match
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {selectedCandidate && (
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle>{selectedCandidate.name}</CardTitle>
                    <CardDescription>
                      {selectedCandidate.currentRole} at {selectedCandidate.currentCompany}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Star className="mr-1 h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm">
                      <MessageSquare className="mr-1 h-4 w-4" />
                      Contact
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={selectedCandidate.avatar} />
                      <AvatarFallback className="text-lg">
                        {selectedCandidate.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-medium">{selectedCandidate.name}</h3>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {selectedCandidate.experience} years experience
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <GraduationCap className="mr-1 h-4 w-4" />
                        {selectedCandidate.education}
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-muted-foreground">Match Score</div>
                    <div className="relative mt-1 h-20 w-20">
                      <svg
                        className="h-full w-full"
                        viewBox="0 0 100 100"
                      >
                        <circle
                          className="stroke-muted-foreground/20"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          strokeWidth="10"
                        />
                        <circle
                          className="stroke-blue-600"
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          strokeWidth="10"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - selectedCandidate.matchScore / 100)}`}
                          transform="rotate(-90 50 50)"
                        />
                        <text
                          x="50"
                          y="55"
                          textAnchor="middle"
                          fontSize="20"
                          fontWeight="bold"
                          fill="currentColor"
                        >
                          {selectedCandidate.matchScore}%
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>

                <Tabs defaultValue="profile">
                  <TabsList className="w-full">
                    <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
                    <TabsTrigger value="skills" className="flex-1">Skills Analysis</TabsTrigger>
                    <TabsTrigger value="timeline" className="flex-1">Career Timeline</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="profile" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Contact Information</h3>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <Card>
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">contact@{selectedCandidate.name.toLowerCase().replace(/\s/g, '')}.com</span>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-3">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">+91 98765 43XXX</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-medium">AI Insights</h3>
                      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-100 dark:border-blue-800">
                        <CardContent className="p-4">
                          <div className="flex space-x-2">
                            <Bot className="h-5 w-5 text-blue-700" />
                            <div className="space-y-2 text-sm">
                              <p>
                                <span className="font-medium">Terra AI Analysis:</span> This candidate has a strong background in {selectedCandidate.skills[0]} and {selectedCandidate.skills[1]} with demonstrated experience at {selectedCandidate.currentCompany}.
                              </p>
                              <p>
                                Their technical skills closely align with your requirements, particularly in {selectedCandidate.skills.slice(0, 3).join(", ")}, making them a potential fit for your Senior Developer role.
                              </p>
                              <p>
                                Based on their profile, they may be open to new opportunities with a competitive package and growth potential.
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="skills" className="space-y-6 pt-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Key Skills Breakdown</h3>
                      <Card>
                        <CardContent className="p-4">
                          <div className="space-y-4">
                            {selectedCandidate.skills.map((skill, index) => (
                              <div key={index} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="font-medium">{skill}</div>
                                  <div className="text-sm">{70 + Math.floor(Math.random() * 30)}%</div>
                                </div>
                                <Progress value={70 + Math.floor(Math.random() * 30)} className="h-2" />
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="font-medium mb-2">Skill Relevance</h3>
                        <Card>
                          <CardContent className="p-4">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span>Required Skills Match</span>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {Math.floor(selectedCandidate.matchScore * 0.8)}%
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Nice-to-have Skills</span>
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {Math.floor(selectedCandidate.matchScore * 0.6)}%
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Experience Relevance</span>
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  {Math.floor(selectedCandidate.matchScore * 0.9)}%
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-2">Strengths & Gaps</h3>
                        <Card>
                          <CardContent className="p-4 space-y-2">
                            <div>
                              <h4 className="text-sm font-medium text-green-600 dark:text-green-400">Strengths</h4>
                              <ul className="ml-5 list-disc text-sm mt-1">
                                <li>{selectedCandidate.skills[0]} expertise</li>
                                <li>Relevant experience at {selectedCandidate.currentCompany}</li>
                                <li>{selectedCandidate.skills[1]} proficiency</li>
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400">Potential Gaps</h4>
                              <ul className="ml-5 list-disc text-sm mt-1">
                                <li>Limited experience with GraphQL</li>
                                <li>No certifications in Cloud technologies</li>
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="timeline" className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Career Progression</h3>
                      <div className="ml-3 mt-6 space-y-6">
                        <div className="relative">
                          <div className="absolute left-[-1.5rem] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                          <div className="absolute bottom-6 left-[-0.9rem] top-6 w-[2px] bg-border"></div>
                          <div className="rounded-lg border pb-6">
                            <div className="p-4">
                              <h4 className="font-medium">{selectedCandidate.currentRole}</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Briefcase className="mr-2 h-4 w-4" />
                                {selectedCandidate.currentCompany}
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                {new Date().getFullYear() - Math.floor(selectedCandidate.experience / 2)} - Present
                              </div>
                              <div className="mt-2 text-sm">
                                <ul className="ml-5 list-disc space-y-1">
                                  <li>Led a team of 5 developers on core product features</li>
                                  <li>Implemented microservices architecture using {selectedCandidate.skills[0]}</li>
                                  <li>Reduced API response time by 40% through optimizations</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute left-[-1.5rem] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                          <div className="absolute bottom-6 left-[-0.9rem] top-6 w-[2px] bg-border"></div>
                          <div className="rounded-lg border pb-6">
                            <div className="p-4">
                              <h4 className="font-medium">Senior Developer</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Briefcase className="mr-2 h-4 w-4" />
                                Previous Company Ltd
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                {new Date().getFullYear() - Math.floor(selectedCandidate.experience) + 1} - {new Date().getFullYear() - Math.floor(selectedCandidate.experience / 2) - 1}
                              </div>
                              <div className="mt-2 text-sm">
                                <ul className="ml-5 list-disc space-y-1">
                                  <li>Developed core features for enterprise application</li>
                                  <li>Implemented CI/CD pipelines using Jenkins</li>
                                  <li>Mentored junior developers on best practices</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="relative">
                          <div className="absolute left-[-1.5rem] top-1 h-4 w-4 rounded-full border-2 border-primary bg-background"></div>
                          <div className="rounded-lg border">
                            <div className="p-4">
                              <h4 className="font-medium">Junior Developer</h4>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Briefcase className="mr-2 h-4 w-4" />
                                First Tech Inc
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar className="mr-2 h-4 w-4" />
                                {new Date().getFullYear() - Math.floor(selectedCandidate.experience) - 1} - {new Date().getFullYear() - Math.floor(selectedCandidate.experience) + 1}
                              </div>
                              <div className="mt-2 text-sm">
                                <ul className="ml-5 list-disc space-y-1">
                                  <li>Developed front-end components using React</li>
                                  <li>Fixed bugs and improved application performance</li>
                                  <li>Participated in Agile development process</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-500" />
                    Reject
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                <Button size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Shortlist Candidate
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}