export interface MembershipFeature {
  key: string;
  label: string;
  description?: string;
}

export interface MembershipPlan {
  tier: 'bronze' | 'silver' | 'gold';
  pricePerMonth: number;
  features: MembershipFeature[];
}
