// components/job/JobCard.tsx
'use client';

import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  DollarSign, 
  Clock, 
  User,
  ExternalLink,
  Timer
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface JobData {
  id: string;
  title: string;
  company: string;
  type: 'FULL-TIME' | 'PART-TIME' | 'CONTRACT' | 'INTERNSHIP';
  location: string;
  salary: string;
  postedDate: string;
  postedBy: string;
  timeAgo: string;
  status: 'active' | 'expired';
  expiresIn?: string;
  description: string;
  keySkills: string[];
  companyWebsite?: string;
}

interface JobCardProps {
  job: JobData;
  onViewDetails?: (job: JobData) => void;
  onApplyNow?: (job: JobData) => void;
  onVisitWebsite?: (job: JobData) => void;
  className?: string;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  onViewDetails,
  onApplyNow,
  onVisitWebsite,
  className
}) => {
  const getTypeColor = (type: string) => {
    const colors = {
      'FULL-TIME': 'bg-blue-500 hover:bg-blue-600 text-white',
      'PART-TIME': 'bg-green-500 hover:bg-green-600 text-white',
      'CONTRACT': 'bg-purple-500 hover:bg-purple-600 text-white',
      'INTERNSHIP': 'bg-orange-500 hover:bg-orange-600 text-white'
    };
    return colors[type as keyof typeof colors] || colors["FULL-TIME"];
  };

  const handleViewDetails = () => {
    onViewDetails?.(job);
  };

  const handleApplyNow = () => {
    onApplyNow?.(job);
  };

  const handleVisitWebsite = () => {
    onVisitWebsite?.(job);
  };

  return (
    <Card className={cn("w-full max-w-4xl bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow", className)}>
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start gap-4">
          {/* Left section - Job title and company */}
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
              {job.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              {job.company}
            </p>
            <Badge className={cn("text-xs font-medium px-3 py-1", getTypeColor(job.type))}>
              {job.type}
            </Badge>
          </div>

          {/* Right section - Job details */}
          <div className="flex gap-8">
            {/* Location */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-gray-500 dark:text-gray-400 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm font-medium">Location</span>
              </div>
              <p className="text-gray-900 dark:text-white font-medium">
                {job.location}
              </p>
            </div>

            {/* Salary */}
            <div className="text-right">
              <div className="flex items-center justify-end gap-1 text-gray-500 dark:text-gray-400 mb-1">
                <DollarSign className="w-4 h-4" />
                <span className="text-sm font-medium">Salary</span>
              </div>
              <p className="text-gray-900 dark:text-white font-medium">
                {job.salary}
              </p>
            </div>
          </div>
        </div>

        {/* Posted info section */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex gap-8">
            {/* Posted Date */}
            <div>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Posted Date</span>
              </div>
              <p className="text-gray-900 dark:text-white">
                {job.postedDate}
              </p>
            </div>

            {/* Posted By */}
            <div>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 mb-1">
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Posted By</span>
              </div>
              <p className="text-gray-900 dark:text-white">
                {job.postedBy}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={handleVisitWebsite}
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visit Website
            </Button>
            <Button
              onClick={handleApplyNow}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Status badges */}
        <div className="flex items-center gap-4 mb-6">
          <Badge variant="secondary" className="text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800">
            <Clock className="w-3 h-3 mr-1" />
            Posted {job.timeAgo}
          </Badge>
          
          {job.status === 'expired' ? (
            <Badge variant="destructive" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
              <Timer className="w-3 h-3 mr-1" />
              Expires in Time expired
            </Badge>
          ) : job.expiresIn ? (
            <Badge variant="secondary" className="text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300">
              <Timer className="w-3 h-3 mr-1" />
              Expires in {job.expiresIn}
            </Badge>
          ) : null}
        </div>

        {/* Job Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Job Description
          </h3>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            <ul className="list-disc list-inside space-y-1">
              {job.description.split('\n').map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Skills */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Key Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {job.keySkills.map((skill, index) => (
              <Badge
                key={index}
                variant="outline"
                className="px-3 py-1 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* View Details Button */}
        <Button 
          onClick={handleViewDetails}
          className="self-start mt-2"
          variant="outline"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;