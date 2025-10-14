import { Container, Typography } from '@mui/material';

export default function Profile() {
  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Typography variant="h4">Profile</Typography>
      <Typography variant="body1" color="text.secondary">Update your information and preferences.</Typography>
    </Container>
  );
}
