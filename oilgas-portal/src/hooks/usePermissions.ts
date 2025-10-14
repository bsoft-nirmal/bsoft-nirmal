import { useAuth } from './useAuth';

export function usePermissions() {
  const { user } = useAuth();
  const role = user?.role;

  const canUseFilters = role === 'company' || (role === 'contractor' && user?.membershipTier !== 'bronze');

  return { role, canUseFilters } as const;
}
