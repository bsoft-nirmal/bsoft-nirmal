import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
