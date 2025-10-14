export enum ApplicationStatus {
  PENDING = 'pending',
  SHORTLISTED = 'shortlisted',
  REJECTED = 'rejected',
  ACCEPTED = 'accepted',
}

export interface Application {
  id: string;
  bidId: string;
  bidTitle: string;
  contractorId: string;
  contractorName: string;
  status: ApplicationStatus;
  coverLetter: string;
  documents: string[];
  appliedDate: string;
  companyName: string;
  budget: string;
}
