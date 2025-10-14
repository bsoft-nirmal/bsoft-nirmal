import { Container, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <Container maxWidth="sm" sx={{ my: 6 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Outlet />
      </Paper>
    </Container>
  );
}
