import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Unauthorized() {
  return (
    <Container maxWidth="sm" sx={{ my: 10, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>Unauthorized</Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        You do not have permission to access this page.
      </Typography>
      <Box mt={2}>
        <Button component={RouterLink} to="/" variant="contained">Go Home</Button>
      </Box>
    </Container>
  );
}
