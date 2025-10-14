import { Box, Toolbar } from '@mui/material';
import NavBar from './components/layout/NavBar';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/layout/Footer';

export default function App() {
  return (
    <Box>
      <NavBar />
      <Toolbar />
      <AppRoutes />
      <Footer />
    </Box>
  );
}
