import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="sticky" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography variant="h6" component={RouterLink} to="/" color="inherit" sx={{ textDecoration: 'none', flexGrow: 1 }}>
            Oil & Gas Portal
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" component={RouterLink} to="/bids">Browse Bids</Button>
            <Button color="inherit" component={RouterLink} to="/membership">Membership</Button>
            <Button color="inherit" component={RouterLink} to="/about">About</Button>
            <Button color="inherit" component={RouterLink} to="/contact">Contact</Button>
            <Button variant="outlined" color="inherit" component={RouterLink} to="/signin">Sign In</Button>
          </Box>
          <IconButton sx={{ display: { xs: 'inline-flex', md: 'none' } }} color="inherit">
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
