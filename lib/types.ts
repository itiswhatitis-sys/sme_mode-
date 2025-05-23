export type Candidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  university: string;
  degree: string;
  yearsOfExperience: number;
  skills: string[];
  resumeUrl: string;
  appliedDate: string;
  status: 'applied' | 'screening' | 'assessment' | 'interview' | 'offer' | 'hired' | 'rejected';
  avatar: string;
};

export type Drive = {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  positions: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  candidatesApplied: number;
  candidatesShortlisted: number;
  rounds: Round[];
  logo: string;
};

export type Round = {
  id: string;
  name: string;
  type: 'screening' | 'assessment' | 'interview' | 'hr';
  date: string;
  duration: number;
  status: 'pending' | 'ongoing' | 'completed';
  candidatesCount: number;
};

export type Assessment = {
  id: string;
  title: string;
  description: string;
  duration: number;
  totalQuestions: number;
  type: 'mcq' | 'coding' | 'descriptive';
  difficulty: 'easy' | 'medium' | 'hard';
  topics: string[];
  createdAt: string;
};

export type AICandidate = {
  id: string;
  name: string;
  currentCompany: string;
  currentRole: string;
  experience: number;
  skills: string[];
  education: string;
  matchScore: number;
  profileUrl: string;
  avatar: string;
};

export type AnalyticsData = {
  applicationsCount: number;
  interviewsScheduled: number;
  offersExtended: number;
  acceptanceRate: number;
  averageTimeToHire: number;
  departmentBreakdown: {
    name: string;
    value: number;
  }[];
  skillDistribution: {
    name: string;
    value: number;
  }[];
  assessmentCompletion: {
    name: string;
    value: number;
  }[];
  placementByDepartment: {
  name: string;
  placed: number;
  notPlaced: number;
}[];
 monthlyHires: {
    name: string;
    value: number;
  }[];

};