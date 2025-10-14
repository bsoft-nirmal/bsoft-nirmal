import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@hooks/useAuth';
import { UserRole } from '@models/user.types';

interface Props {
  requiredRole: UserRole;
}

export default function RoleBasedRoute({ requiredRole }: Props) {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) return <Navigate to="/signin" replace />;

  if (user?.role !== requiredRole) return <Navigate to="/unauthorized" replace />;

  return <Outlet />;
}
