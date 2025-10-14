import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import PrivateRoute from './PrivateRoute';
import RoleBasedRoute from './RoleBasedRoute';

const Home = lazy(() => import('@pages/Home/index'));
const BrowseBids = lazy(() => import('@pages/BrowseBids/index'));
const BidDetails = lazy(() => import('@pages/BidDetails/index'));
const SignIn = lazy(() => import('@pages/Auth/SignIn/index'));
const SignUp = lazy(() => import('@pages/Auth/SignUp/index'));
const Membership = lazy(() => import('@pages/Membership/index'));
const Profile = lazy(() => import('@pages/Profile/index'));
const NotFound = lazy(() => import('@pages/NotFound/index'));
const Unauthorized = lazy(() => import('@pages/Unauthorized/index'));

const ContractorDashboard = lazy(() => import('@pages/Dashboard/Contractor/index'));
const CompanyDashboard = lazy(() => import('@pages/Dashboard/Company/index'));
const AdminDashboard = lazy(() => import('@pages/Dashboard/Admin/index'));

function Loader() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
      <CircularProgress />
    </Box>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/bids" element={<BrowseBids />} />
          <Route path="/bids/:id" element={<BidDetails />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />

            <Route element={<RoleBasedRoute requiredRole={"contractor" as any} />}>
              <Route path="/dashboard/contractor" element={<ContractorDashboard />} />
            </Route>

            <Route element={<RoleBasedRoute requiredRole={"company" as any} />}>
              <Route path="/dashboard/company" element={<CompanyDashboard />} />
            </Route>

            <Route element={<RoleBasedRoute requiredRole={"admin" as any} />}>
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Route>
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
