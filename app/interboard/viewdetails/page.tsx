// components/job/JobCardWrapper.tsx
'use client';

import JobCard, { JobData } from '@/components/Viewdetailscard';
import React from 'react';

// Sample job data matching your image
const sampleJobs: JobData[] = [
  {
    id: '1',
    title: 'Software Developer Intern',
    company: 'Interain',
    type: 'INTERNSHIP',
    location: 'Chennai',
    salary: '10 - 15 LPA',
    postedDate: '04 Apr 25',
    postedBy: 'Aswin',
    timeAgo: '1 month ago',
    status: 'expired',
    expiresIn: 'Time expired',
    description: 'Seeking a motivated Software Developer Intern to join our dynamic team. You will work on real-world projects, collaborate with experienced developers, and gain hands-on experience in modern web technologies. Perfect opportunity for students looking to kickstart their career in software development.',
    keySkills: ['Reactjs', 'Nextjs', 'MongoDb', 'Tailwindcss'],
    companyWebsite: 'https://interain.com'
  },
  {
    id: '2',
    title: 'Frontend Developer',
    company: 'TechCorp',
    type: 'FULL-TIME',
    location: 'Mumbai',
    salary: '8 - 12 LPA',
    postedDate: '10 May 25',
    postedBy: 'HR Team',
    timeAgo: '2 weeks ago',
    status: 'active',
    expiresIn: '2 weeks',
    description: 'Looking for an experienced Frontend Developer to build amazing user interfaces with modern technologies and best practices.',
    keySkills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
    companyWebsite: 'https://techcorp.com'
  }
];

const JobCardWrapper: React.FC = () => {
  const handleViewDetails = (job: JobData) => {
    console.log('View details for job:', job.title);
    // Navigate to job details page
    // Example: router.push(`/jobs/${job.id}`);
  };

  const handleApplyNow = (job: JobData) => {
    console.log('Apply for job:', job.title);
    // Handle job application
    // Example: router.push(`/jobs/${job.id}/apply`);
  };

  const handleVisitWebsite = (job: JobData) => {
    console.log('Visit website for:', job.company);
    // Open company website
    if (job.companyWebsite) {
      window.open(job.companyWebsite, '_blank');
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        {sampleJobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onViewDetails={handleViewDetails}
            onApplyNow={handleApplyNow}
            onVisitWebsite={handleVisitWebsite}
          />
        ))}
      </div>
    </div>
  );
};

export default JobCardWrapper;

// Example usage in a page component:
/*
// pages/jobs.tsx or app/jobs/page.tsx
import JobCardWrapper from '@/components/job/JobCardWrapper';

export default function JobsPage() {
  return <JobCardWrapper />;
}
*/