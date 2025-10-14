import { Box, Container, Drawer, List, ListItemButton, ListItemText, Toolbar } from '@mui/material';
import Navbar from '@components/common/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';

export default function DashboardLayout() {
  const navigate = useNavigate();
  return (
    <Box>
      <Navbar />
      <Box display="flex">
        <Drawer variant="permanent" sx={{ width: 240, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: 240 } }}>
          <Toolbar />
          <List>
            <ListItemButton onClick={() => navigate('/dashboard/contractor')}>
              <ListItemText primary="Contractor" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/dashboard/company')}>
              <ListItemText primary="Company" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate('/dashboard/admin')}>
              <ListItemText primary="Admin" />
            </ListItemButton>
          </List>
        </Drawer>
        <Container maxWidth="lg" sx={{ my: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
}
