import { Box, Container, Stack, Typography, Link } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 6, mt: 8 }}>
      <Container>
        <Grid container spacing={4} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Oil & Gas Portal</Typography>
            <Typography color="text.secondary" variant="body2">Connecting contractors and companies in the oil & gas industry worldwide.</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography fontWeight={800} sx={{ mb: 1 }}>Platform</Typography>
            <Stack>
              <Link>Browse Bids</Link>
              <Link>Post Projects</Link>
              <Link>Membership</Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography fontWeight={800} sx={{ mb: 1 }}>Support</Typography>
            <Stack>
              <Link>Help Center</Link>
              <Link>Contact Us</Link>
              <Link>Privacy Policy</Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography fontWeight={800} sx={{ mb: 1 }}>Connect</Typography>
            <Stack direction="row" spacing={2}>
              <Link>LinkedIn</Link>
              <Link>Twitter</Link>
              <Link>Facebook</Link>
            </Stack>
          </Grid>
        </Grid>
        <Typography textAlign="center" color="text.secondary" variant="body2">© 2024 Oil & Gas Bidding Portal. All rights reserved.</Typography>
      </Container>
    </Box>
  );
}
