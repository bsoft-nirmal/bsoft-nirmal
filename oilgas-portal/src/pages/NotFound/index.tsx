import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function NotFound() {
  return (
    <Container maxWidth="sm" sx={{ my: 10, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>404 - Not Found</Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        The page you are looking for does not exist.
      </Typography>
      <Box mt={2}>
        <Button component={RouterLink} to="/" variant="contained">Go Home</Button>
      </Box>
    </Container>
  );
}
