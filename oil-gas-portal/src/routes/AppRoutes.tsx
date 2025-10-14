import { Route, Routes, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import BrowseBids from '../pages/BrowseBids';
import Membership from '../pages/Membership';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import ContractorDashboard from '../pages/dashboard/ContractorDashboard';
import CompanyDashboard from '../pages/dashboard/CompanyDashboard';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import { useAuth } from '../features/auth/AuthContext';
import { ProtectedRoute } from '../features/rbac/ProtectedRoute';

function DashboardRouter() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/signin" replace />;
  if (user.role === 'CONTRACTOR') return <ContractorDashboard />;
  if (user.role === 'COMPANY') return <CompanyDashboard />;
  if (user.role === 'ADMIN') return <AdminDashboard />;
  return <Navigate to="/" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<BrowseBids />} />
      <Route path="/membership" element={<Membership />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute require="view.dashboard.contractor" />}>
        <Route path="/dashboard" element={<DashboardRouter />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
