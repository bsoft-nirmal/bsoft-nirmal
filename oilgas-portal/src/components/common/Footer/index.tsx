import { Box, Container, Typography } from '@mui/material';

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 4, bgcolor: 'grey.100', mt: 6 }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Oil & Gas Portal. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
