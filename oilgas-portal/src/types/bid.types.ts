export enum BidStatus {
  OPEN = 'open',
  CLOSED = 'closed',
  URGENT = 'urgent',
  DRAFT = 'draft',
}

export enum IndustrySector {
  OFFSHORE_OPERATIONS = 'offshore_operations',
  PIPELINE = 'pipeline',
  DRILLING = 'drilling',
  REFINING = 'refining',
  EXPLORATION = 'exploration',
}

export interface Bid {
  id: string;
  title: string;
  description: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  status: BidStatus;
  industry: IndustrySector;
  location: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  requirements: string[];
  applicantCount: number;
  postedDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface BidFilters {
  industry?: IndustrySector[];
  location?: string[];
  bidType?: string[];
  budgetRange?: {
    min: number;
    max: number;
  };
  deadline?: string;
  searchQuery?: string;
}
