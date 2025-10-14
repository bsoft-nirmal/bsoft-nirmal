import { AppBar, Toolbar, Container, Stack, Button, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';
import { useThemeContext } from '../../theme/ThemeProvider';

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user, signOut } = useAuth();
  const { toggleMode } = useThemeContext();
  const navigate = useNavigate();
  const location = useLocation();

  const pages = [
    { to: '/', label: 'Home' },
    { to: '/browse', label: 'Browse Bids' },
    { to: '/membership', label: 'Membership' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <AppBar position="fixed" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
      <Toolbar>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography component={RouterLink} to="/" variant="h6" fontWeight={800} color="primary" sx={{ textDecoration: 'none' }}>
              🛢️ Oil & Gas Portal
            </Typography>
            <Stack direction="row" spacing={2} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {pages.map((p) => (
                <Button key={p.to} component={RouterLink} to={p.to} color={location.pathname === p.to ? 'primary' : 'inherit'}>{p.label}</Button>
              ))}
            </Stack>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <Button variant="outlined" size="small" onClick={toggleMode}>Theme</Button>
            {!user ? (
              <>
                <Button variant="outlined" size="small" onClick={() => navigate('/signin')}>Sign In</Button>
                <Button variant="contained" size="small" onClick={() => navigate('/signup')}>Sign Up</Button>
              </>
            ) : (
              <>
                <Button variant="outlined" size="small" onClick={() => navigate('/dashboard')}>Dashboard</Button>
                <Button variant="text" size="small" onClick={signOut}>Sign Out</Button>
              </>
            )}
            <IconButton sx={{ display: { xs: 'inline-flex', md: 'none' } }} onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MenuIcon />
            </IconButton>
          </Stack>
        </Container>
      </Toolbar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} keepMounted>
        {pages.map((p) => (
          <MenuItem key={p.to} component={RouterLink} to={p.to} onClick={() => setAnchorEl(null)}>{p.label}</MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
}
