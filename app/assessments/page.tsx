"use client";

import React, { useState } from "react";
import {
  Plus,
  Search,
  Clock,
  FileText,
  Code,
  Edit,
  MoreHorizontal,
  Filter,
  Trash,
  Copy,
  FileCheck,
  Eye,
  PlusCircle,
  CheckCircle,
  Calculator,
  ChevronDown,
  CalendarDays,
  Users,
  Share,
  Download,
  BarChart3,
  ArrowUpRight,
  Star,
  StarHalf,
  Bookmark,
  BookmarkPlus,
  UserPlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockAssessments } from "@/lib/mockData";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

export default function Assessments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [previewAssessment, setPreviewAssessment] = useState<any>(null);
  const [selectedAssessments, setSelectedAssessments] = useState<string[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  // Custom assessment templates for quick creation
  const assessmentTemplates = [
    { name: "Technical MCQ", type: "mcq", icon: FileCheck, questions: 15, duration: 30, topics: ["Programming", "Data Structures"], difficulty: "medium" },
    { name: "Coding Challenge", type: "coding", icon: Code, questions: 3, duration: 60, topics: ["Algorithms", "Problem Solving"], difficulty: "hard" },
    { name: "System Design", type: "descriptive", icon: FileText, questions: 5, duration: 45, topics: ["Architecture", "Design Patterns"], difficulty: "hard" },
    { name: "SQL Assessment", type: "coding", icon: Code, questions: 7, duration: 40, topics: ["Database", "SQL Queries"], difficulty: "medium" },
    { name: "Frontend Skills", type: "coding", icon: Code, questions: 10, duration: 45, topics: ["HTML/CSS", "JavaScript", "React"], difficulty: "medium" },
    { name: "Aptitude Test", type: "mcq", icon: Calculator, questions: 20, duration: 25, topics: ["Logical Reasoning", "Quantitative"], difficulty: "easy" },
  ];
  
  // Filter assessments based on search term and filter
  const filteredAssessments = mockAssessments.filter(assessment => {
    const matchesSearch = assessment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assessment.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (selectedFilter === "all") return matchesSearch;
    return matchesSearch && assessment.type === selectedFilter;
  });

  const getAssessmentTypeIcon = (type: string) => {
    switch (type) {
      case "mcq":
        return <FileCheck className="h-4 w-4" />;
      case "coding":
        return <Code className="h-4 w-4" />;
      case "descriptive":
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getAssessmentTypeColor = (type: string) => {
    switch (type) {
      case "mcq":
        return "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200";
      case "coding":
        return "bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200";
      case "descriptive":
        return "bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200";
      default:
        return "";
    }
  };
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-50 text-green-800 hover:bg-green-50 border-green-200";
      case "medium":
        return "bg-amber-50 text-amber-800 hover:bg-amber-50 border-amber-200";
      case "hard":
        return "bg-red-50 text-red-800 hover:bg-red-50 border-red-200";
      default:
        return "";
    }
  };

  const handleCheckboxChange = (id: string) => {
    setSelectedAssessments(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedAssessments(filteredAssessments.map(a => a.id));
    } else {
      setSelectedAssessments([]);
    }
  };

  const handleCreateFromTemplate = (template: any) => {
    toast({
      title: "Template selected",
      description: `Creating new ${template.name} assessment`,
    });
    setIsCreateDialogOpen(false);
  };

  const handleSaveAssessment = () => {
    toast({
      title: "Assessment saved",
      description: "Your assessment has been saved successfully",
    });
  };

  const handleBookmark = (id: string) => {
    toast({
      title: "Assessment bookmarked",
      description: "Added to your saved assessments",
    });
  };

  // Dummy MCQ questions for preview
  const dummyMcqQuestions = [
    {
      id: "1",
      question: "Which of the following is not a primitive data type in Java?",
      options: ["int", "float", "String", "boolean"],
      correctAnswer: "String",
    },
    {
      id: "2",
      question: "What is the output of System.out.println(5 + 7 + \"Java\");?",
      options: ["12Java", "5 + 7 + Java", "57Java", "Java57"],
      correctAnswer: "12Java",
    },
    {
      id: "3",
      question: "Which interface is used to create a thread in Java?",
      options: ["Serializable", "Runnable", "Comparable", "Cloneable"],
      correctAnswer: "Runnable",
    },
  ];

  // Dummy coding questions for preview
  const dummyCodingQuestions = [
    {
      id: "1",
      title: "Two Sum",
      description: "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
      constraints: [
        "Each input would have exactly one solution.",
        "You may not use the same element twice.",
      ],
      examples: [
        {
          input: "nums = [2, 7, 11, 15], target = 9",
          output: "[0, 1]",
          explanation: "Because nums[0] + nums[1] = 2 + 7 = 9"
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
          <p className="text-muted-foreground">
            Create and manage assessment tests for candidates
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Assessment
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Create New Assessment</DialogTitle>
                <DialogDescription>
                  Choose a template or start from scratch to create a new assessment
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-full">
                  <h3 className="text-sm font-medium mb-2">Quick Templates</h3>
                  <Separator className="mb-4" />
                </div>
                
                {assessmentTemplates.map((template, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start p-4 border rounded-md hover:border-primary hover:bg-secondary/30 cursor-pointer transition-colors"
                    onClick={() => handleCreateFromTemplate(template)}
                  >
                    <div className={cn(
                      "rounded-full p-2 mr-3",
                      template.type === "mcq" && "bg-blue-100",
                      template.type === "coding" && "bg-purple-100",
                      template.type === "descriptive" && "bg-amber-100"
                    )}>
                      <template.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{template.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {template.questions} questions · {template.duration} min
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {template.topics.map((topic, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        <Badge className={cn(
                          "text-xs ml-1",
                          getDifficultyColor(template.difficulty)
                        )}>
                          {template.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="col-span-full mt-2">
                  <Button variant="outline" className="w-full" onClick={() => handleCreateFromTemplate({name: "Custom Assessment"})}>
                    <Plus className="mr-2 h-4 w-4" />
                    Start from scratch
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export Assessments</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="hidden sm:flex">
                  <BarChart3 className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Analytics Dashboard</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search assessments..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={selectedFilter}
              onValueChange={setSelectedFilter}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Assessment Type</SelectLabel>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="mcq">
                    <div className="flex items-center">
                      <FileCheck className="mr-2 h-4 w-4" />
                      <span>Multiple Choice</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="coding">
                    <div className="flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      <span>Coding</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="descriptive">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Descriptive</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            
            {selectedAssessments.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Actions <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => {
                    toast({
                      title: "Assessments assigned",
                      description: `${selectedAssessments.length} assessments have been assigned to the drive`
                    });
                    setSelectedAssessments([]);
                  }}>
                    <Share className="mr-2 h-4 w-4" />
                    Assign to Drive
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Selected
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Selected
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        
        {selectedAssessments.length > 0 && (
          <div className="flex items-center gap-2 p-2 bg-secondary/50 rounded-md">
            <Checkbox 
              id="select-all"
              checked={selectedAssessments.length === filteredAssessments.length}
              onCheckedChange={handleSelectAll}
            />
            <Label htmlFor="select-all" className="text-sm">
              {selectedAssessments.length} assessments selected
            </Label>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-auto mr-2"
              onClick={() => setSelectedAssessments([])}
            >
              Clear selection
            </Button>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="relative">
            All Assessments
            <Badge variant="secondary" className="ml-2 px-1 py-0 h-5 min-w-5 text-xs">
              {mockAssessments.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="recent" className="relative">
            Recently Used
            <Badge variant="secondary" className="ml-2 px-1 py-0 h-5 min-w-5 text-xs">
              3
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="favorites" className="relative">
            Favorites
            <Badge variant="secondary" className="ml-2 px-1 py-0 h-5 min-w-5 text-xs">
              2
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="drafts">
            Drafts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAssessments.map((assessment) => (
              <Card key={assessment.id} className={cn(
                "overflow-hidden transition-all", 
                selectedAssessments.includes(assessment.id) && "ring-2 ring-primary"
              )}>
                <div className="absolute top-3 left-3">
                  <Checkbox 
                    checked={selectedAssessments.includes(assessment.id)}
                    onCheckedChange={() => handleCheckboxChange(assessment.id)}
                    className="h-4 w-4"
                  />
                </div>
                
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between">
                    <div className="pl-6"> {/* Added padding to accommodate checkbox */}
                      <CardTitle className="line-clamp-1 text-lg">
                        {assessment.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">
                        {assessment.description}
                      </CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8"
                        onClick={() => handleBookmark(assessment.id)}
                      >
                        <Bookmark className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuGroup>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                              <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Share className="mr-2 h-4 w-4" />
                              Assign to Drive
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Share with Team
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="mt-2 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("capitalize", getAssessmentTypeColor(assessment.type))}
                    >
                      {getAssessmentTypeIcon(assessment.type)}
                      <span className="ml-1">{assessment.type}</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn("capitalize", getDifficultyColor(assessment.difficulty))}
                    >
                      {assessment.difficulty}
                    </Badge>
                    
                    {/* Usage statistics badge */}
                    <Badge variant="outline" className="ml-auto">
                      <Users className="h-3 w-3 mr-1" />
                      <span>{Math.floor(Math.random() * 100) + 10}</span>
                    </Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {assessment.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      {assessment.duration} minutes
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                      {assessment.totalQuestions} questions
                    </div>
                  </div>
                  
                  {/* Added statistics indicators */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Avg. Completion Rate</span>
                      <span className="font-medium">{65 + Math.floor(Math.random() * 30)}%</span>
                    </div>
                    <Progress value={65 + Math.floor(Math.random() * 30)} className="h-1" />
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 p-4">
                  <div className="flex w-full items-center justify-between">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center">
                            <CalendarDays className="h-3.5 w-3.5 text-muted-foreground mr-1" />
                            <p className="text-xs text-muted-foreground">
                              {new Date(assessment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Created on {new Date(assessment.createdAt).toDateString()}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                          toast({
                            title: "Analytics opened",
                            description: "Viewing performance metrics for this assessment"
                          });
                        }}
                      >
                        <BarChart3 className="h-3 w-3 mr-1" />
                        Stats
                      </Button>
                      
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="default" 
                            size="sm"
                            className="h-7 text-xs"
                            onClick={() => setPreviewAssessment(assessment)}
                          >
                            <Eye className="mr-1 h-3 w-3" />
                            Preview
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Assessment Preview</DialogTitle>
                            <DialogDescription>
                              Preview the assessment as candidates will see it
                            </DialogDescription>
                          </DialogHeader>
                          
                          {previewAssessment && (
                            <div className="max-h-[70vh] overflow-y-auto py-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h2 className="text-xl font-bold">{previewAssessment.title}</h2>
                                  <p className="text-muted-foreground">{previewAssessment.description}</p>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span>{previewAssessment.duration} minutes</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                    <span>{previewAssessment.totalQuestions} questions</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-6 space-y-6">
                                {previewAssessment.type === "mcq" && dummyMcqQuestions.map((q, i) => (
                                  <div key={i} className="rounded-lg border p-4 shadow-sm">
                                    <h3 className="font-medium">Question {i + 1}</h3>
                                    <p className="mt-2">{q.question}</p>
                                    <div className="mt-4 space-y-2">
                                      {q.options.map((option, j) => (
                                        <div key={j} className="flex items-center space-x-2">
                                          <Checkbox id={`q${i}-opt${j}`} />
                                          <Label htmlFor={`q${i}-opt${j}`}>{option}</Label>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                ))}
                                
                                {previewAssessment.type === "coding" && dummyCodingQuestions.map((q, i) => (
                                  <div key={i} className="rounded-lg border p-4 shadow-sm">
                                    <h3 className="font-medium">{q.title}</h3>
                                    <p className="mt-2">{q.description}</p>
                                    
                                    <div className="mt-4">
                                      <h4 className="text-sm font-medium">Constraints:</h4>
                                      <ul className="ml-5 list-disc text-sm">
                                        {q.constraints.map((constraint, j) => (
                                          <li key={j}>{constraint}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    
                                    <div className="mt-4">
                                      <h4 className="text-sm font-medium">Example:</h4>
                                      <div className="mt-2 rounded bg-muted p-3 text-sm">
                                        <div>
                                          <span className="font-medium">Input:</span> {q.examples[0].input}
                                        </div>
                                        <div>
                                          <span className="font-medium">Output:</span> {q.examples[0].output}
                                        </div>
                                        <div>
                                          <span className="font-medium">Explanation:</span> {q.examples[0].explanation}
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="mt-4">
                                      <h4 className="text-sm font-medium">Solution:</h4>
                                      <div className="mt-2 rounded border bg-muted/50 p-2">
                                        <pre className="text-sm"><code>{"// Write your code here"}</code></pre>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          <DialogFooter>
                            <Button variant="outline" onClick={() => {
                              toast({
                                title: "Assessment shared",
                                description: "Assessment link copied to clipboard"
                              });
                            }}>
                              <Share className="mr-2 h-4 w-4" />
                              Share
                            </Button>
                            <Button variant="secondary" onClick={() => {
                              toast({
                                title: "Editing assessment",
                                description: "Opening assessment editor"
                              });
                            }}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Assessment
                            </Button>
                            <Button onClick={() => {
                              toast({
                                title: "Assessment scheduled",
                                description: "Now ready to assign to candidates"
                              });
                            }}>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Schedule Assessment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed border-2 hover:border-primary hover:bg-secondary/20 transition-colors cursor-pointer" onClick={() => setIsCreateDialogOpen(true)}>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-3 font-medium">Create New Assessment</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">
                  Create custom assessments for your candidates
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="space-y-4">
          <div className="rounded-lg border shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium">Recently Used Assessments</h3>
              <p className="text-sm text-muted-foreground">
                Assessments that were recently used in recruitment drives
              </p>
              
              <div className="mt-6 divide-y">
                {filteredAssessments.slice(0, 3).map((assessment, idx) => (
                  <div key={assessment.id} className="flex items-center justify-between py-4">
                    <div className="flex items-start space-x-4">
                      <div className={cn(
                        "rounded-full p-2",
                        assessment.type === "mcq" && "bg-blue-100",
                        assessment.type === "coding" && "bg-purple-100",
                        assessment.type === "descriptive" && "bg-amber-100"
                      )}>
                        {getAssessmentTypeIcon(assessment.type)}
                      </div>
                      <div>
                        <h4 className="font-medium">{assessment.title}</h4>
                        <p className="text-sm text-muted-foreground">{assessment.totalQuestions} questions • {assessment.duration} minutes</p>
                        <div className="mt-1 flex gap-2">
                          <Badge variant="secondary" className="text-xs">Used {idx + 1} day{idx === 0 ? "" : "s"} ago</Badge>
                          <Badge variant="secondary" className="text-xs">{assessment.topics[0]}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" className="text-xs">
                        <Eye className="mr-1 h-4 w-4" />
                        Preview
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs" onClick={() => {
                        toast({
                          title: "Assessment selected",
                          description: `${assessment.title} added to active drive`
                        });
                      }}>
                        <CheckCircle className="mr-1 h-4 w-4" />
                        Use
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex justify-center">
                <Button variant="link">View All Recent Assessments</Button>
              </div>
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Assessment Performance</CardTitle>
                <CardDescription>
                  How candidates perform on your assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Average Completion Rate</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "78%" }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Average Score</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "68%" }} />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Questions Answered Correctly</span>
                      <span className="font-medium">64%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary">
                      <div className="h-2 rounded-full bg-primary" style={{ width: "64%" }} />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <h4 className="font-medium">Performance by Topic</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span>Java Syntax</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">82%</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            star <= 4 ? (
                              <Star key={star} className="h-3 w-3 text-amber-500" />
                            ) : (
                              <StarHalf key={star} className="h-3 w-3 text-amber-500" />
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Data Structures</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">76%</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            star <= 4 ? (
                              <Star key={star} className="h-3 w-3 text-amber-500" />
                            ) : (
                              <StarHalf key={star} className="h-3 w-3 text-amber-500" />
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>OOP Concepts</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">71%</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            star <= 3 ? (
                              <Star key={star} className="h-3 w-3 text-amber-500" />
                            ) : star === 4 ? (
                              <StarHalf key={star} className="h-3 w-3 text-amber-500" />
                            ) : (
                              <Star key={star} className="h-3 w-3 text-muted-foreground" />
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Algorithms</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">58%</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            star <= 3 ? (
                              <Star key={star} className="h-3 w-3 text-amber-500" />
                            ) : (
                              <Star key={star} className="h-3 w-3 text-muted-foreground" />
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>SQL</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-2">52%</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            star <= 2 ? (
                              <Star key={star} className="h-3 w-3 text-amber-500" />
                            ) : star === 3 ? (
                              <StarHalf key={star} className="h-3 w-3 text-amber-500" />
                            ) : (
                              <Star key={star} className="h-3 w-3 text-muted-foreground" />
                            )
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="link" size="sm" className="pl-0">
                    <ArrowUpRight className="mr-1 h-4 w-4" />
                    View detailed analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Candidates</CardTitle>
                <CardDescription>
                  Recent candidates who took your assessments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarImage src={`https://images.pexels.com/photos/${614810 + i}/pexels-photo-${614810 + i}.jpeg?auto=compress&cs=tinysrgb&w=600`} />
                          <AvatarFallback>
                            {["RS", "PP", "AK", "DR", "VS"][i]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {["Rahul Sharma", "Priya Patel", "Arun Kumar", "Deepika Reddy", "Vikram Singh"][i]}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {["Java Assessment", "Frontend Challenge", "SQL Assessment", "Data Structures", "System Design"][i]}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <Calculator className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {[85, 78, 92, 65, 73][i]}%
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {[2, 1, 3, 1, 2][i]} day{[2, 1, 3, 1, 2][i] === 1 ? "" : "s"} ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" className="w-full mt-4" onClick={() => {
                  toast({
                    title: "Viewing candidates",
                    description: "Opening candidate performance reports"
                  });
                }}>
                  <Users className="mr-1 h-4 w-4" />
                  View All Candidates
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredAssessments.slice(1, 3).map((assessment) => (
              <Card key={assessment.id} className="overflow-hidden">
                <CardHeader className="p-4 pb-2">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="line-clamp-1 text-lg">
                        {assessment.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2 mt-1">
                        {assessment.description}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleBookmark(assessment.id)}>
                      <BookmarkPlus className="h-4 w-4 text-primary" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="mt-2 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("capitalize", getAssessmentTypeColor(assessment.type))}
                    >
                      {getAssessmentTypeIcon(assessment.type)}
                      <span className="ml-1">{assessment.type}</span>
                    </Badge>
                    <Badge
                      variant="outline"
                      className={cn("capitalize", getDifficultyColor(assessment.difficulty))}
                    >
                      {assessment.difficulty}
                    </Badge>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1">
                    {assessment.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      {assessment.duration} min
                    </div>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                      {assessment.totalQuestions} questions
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-muted/50 p-4">
                  <div className="flex w-full items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(assessment.createdAt).toLocaleDateString()}
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setPreviewAssessment(assessment)}
                    >
                      <Eye className="mr-1 h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="drafts">
          <div className="rounded-lg border shadow-sm">
            <div className="p-6 text-center">
              <div className="mx-auto w-fit rounded-full bg-muted p-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-3 text-lg font-medium">No Draft Assessments</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                You dont have any assessment drafts saved. Create a new assessment to get started.
              </p>
              <Button className="mt-4" onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Assessment
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}