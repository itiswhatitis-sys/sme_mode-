"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CreateDriveModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateDriveModal({ isOpen, onClose }: CreateDriveModalProps) {
  const [step, setStep] = useState(1);
  const [driveDate, setDriveDate] = useState<Date | undefined>(new Date());
  const router = useRouter();
  
  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit form and navigate to drive details
      router.push("/drives/new");
      onClose();
    }
  };
  
  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onClose();
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Recruitment Drive</DialogTitle>
        </DialogHeader>
        
        <div className="flex justify-between mb-6 text-sm">
          <div className={`flex items-center ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${step >= 1 ? 'bg-primary text-white' : 'border'}`}>
              1
            </div>
            Basic Info
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
          <div className={`flex items-center ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${step >= 2 ? 'bg-primary text-white' : 'border'}`}>
              2
            </div>
            Job Details
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground mx-2" />
          <div className={`flex items-center ${step >= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`h-6 w-6 rounded-full flex items-center justify-center mr-2 ${step >= 3 ? 'bg-primary text-white' : 'border'}`}>
              3
            </div>
            Schedule
          </div>
        </div>
        
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="drive-title">Drive Title</Label>
              <Input id="drive-title" placeholder="e.g. Software Developer Campus Drive" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="drive-type">Drive Type</Label>
                <Select>
                  <SelectTrigger id="drive-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="campus">Campus Placement</SelectItem>
                    <SelectItem value="internship">Internship Drive</SelectItem>
                    <SelectItem value="lateral">Lateral Hiring</SelectItem>
                    <SelectItem value="external">External Recruitment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hiring-model">Hiring Model</Label>
                <Select>
                  <SelectTrigger id="hiring-model">
                    <SelectValue placeholder="Select model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ecosystem">Ecosystem</SelectItem>
                    <SelectItem value="non-ecosystem">Non-Ecosystem</SelectItem>
                    <SelectItem value="lateral">Lateral</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="drive-description">Description</Label>
              <Textarea 
                id="drive-description" 
                placeholder="Brief overview of the recruitment drive"
                rows={3} 
              />
            </div>
          </div>
        )}
        
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input id="job-title" placeholder="e.g. Software Engineer" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="job-type">Job Type</Label>
                <Select>
                  <SelectTrigger id="job-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full Time</SelectItem>
                    <SelectItem value="part-time">Part Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level</Label>
                <Select>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="junior">Junior (1-3 years)</SelectItem>
                    <SelectItem value="mid">Mid-Level (3-5 years)</SelectItem>
                    <SelectItem value="senior">Senior (5+ years)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="required-skills">Required Skills</Label>
              <Input id="required-skills" placeholder="e.g. React, Node.js, TypeScript" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea 
                id="job-description" 
                placeholder="Detailed job description"
                rows={3} 
              />
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Drive Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !driveDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {driveDate ? format(driveDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={driveDate}
                      onSelect={setDriveDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="college">College/Institution</Label>
                <Select>
                  <SelectTrigger id="college">
                    <SelectValue placeholder="Select institution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nit">National Institute of Technology</SelectItem>
                    <SelectItem value="iit">Indian Institute of Technology</SelectItem>
                    <SelectItem value="coe">College of Engineering</SelectItem>
                    <SelectItem value="iom">Institute of Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-positions">Target Positions</Label>
                <Input id="target-positions" type="number" min="1" placeholder="Number of positions" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="application-deadline">Application Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="application-deadline"
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Select deadline</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additional-notes">Additional Notes</Label>
              <Textarea 
                id="additional-notes" 
                placeholder="Any additional information about the schedule"
                rows={3} 
              />
            </div>
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={handleBack}>
            {step === 1 ? "Cancel" : "Back"}
          </Button>
          <Button onClick={handleNext}>
            {step === 3 ? "Create Drive" : "Next"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}