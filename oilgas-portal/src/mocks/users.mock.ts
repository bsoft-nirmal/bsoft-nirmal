import { MembershipTier, UserRole, type User } from '@models/user.types';

export const mockContractor: User = {
  id: 'contractor-1',
  email: 'contractor@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phoneNumber: '+123456789',
  role: UserRole.CONTRACTOR,
  membershipTier: MembershipTier.BRONZE,
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  certifications: ['ISO 9001'],
  qualifications: ['BOSIET'],
  profileViews: 102,
};

export const mockCompany: User = {
  id: 'company-1',
  email: 'shell@company.com',
  firstName: 'Shell',
  lastName: 'International',
  phoneNumber: '+123456789',
  role: UserRole.COMPANY,
  membershipTier: MembershipTier.GOLD,
  isVerified: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  companyName: 'Shell International',
  companyVerified: true,
};
