import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import type { Permission } from './rbac';
import { can } from './rbac';

export function ProtectedRoute({ require }: { require: Permission }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }
  const allowed = can(user.role, user.membershipTier, require);
  if (!allowed) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
