export enum UserRole {
  CONTRACTOR = 'contractor',
  COMPANY = 'company',
  ADMIN = 'admin',
}

export enum MembershipTier {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  role: UserRole;
  membershipTier: MembershipTier;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  certifications?: string[];
  qualifications?: string[];
  profileViews?: number;
  companyName?: string;
  companyVerified?: boolean;
}
