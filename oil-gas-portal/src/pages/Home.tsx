import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import OilBarrelIcon from '@mui/icons-material/OilBarrel';
import BusinessIcon from '@mui/icons-material/Business';
import ConstructionIcon from '@mui/icons-material/Construction';
import PublicIcon from '@mui/icons-material/Public';
import ShieldIcon from '@mui/icons-material/Shield';
import InsightsIcon from '@mui/icons-material/Insights';
import { useNavigate } from 'react-router-dom';
 
import { useTheme } from '@mui/material/styles';

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{
        pt: { xs: 10, md: 16 },
        pb: { xs: 10, md: 16 },
        color: 'common.white',
        background: `linear-gradient(rgba(30,58,138,0.8), rgba(30,58,138,0.8)), radial-gradient(circle at 20% 20%, ${theme.palette.primary.dark}, transparent 40%)`,
      }}>
        <Container>
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Typography variant="h3" fontWeight={800}>Connect with Oil & Gas Opportunities Worldwide</Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 800 }}>
              Join thousands of contractors and companies in the world's largest oil & gas bidding platform
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button variant="contained" size="large" startIcon={<ConstructionIcon />} onClick={() => navigate('/signup?role=contractor')}>Join as Contractor</Button>
              <Button variant="outlined" color="inherit" size="large" startIcon={<BusinessIcon />} onClick={() => navigate('/signup?role=company')}>Join as Company</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: 10 }}>
        <Typography variant="h4" textAlign="center" fontWeight={800} gutterBottom>Why Choose Our Platform?</Typography>
        <Grid container spacing={4} sx={{ mt: 0 }}>
          {[{ icon: <PublicIcon fontSize="large" />, title: 'Global Reach', text: 'Connect with opportunities across 50+ countries and major oil fields worldwide' },
            { icon: <ShieldIcon fontSize="large" />, title: 'Verified Companies', text: 'All companies are thoroughly vetted and verified for authenticity and reliability' },
            { icon: <InsightsIcon fontSize="large" />, title: 'Smart Matching', text: 'AI-powered matching system connects you with the most relevant opportunities' },
          ].map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.title}>
              <Stack alignItems="center" spacing={1}>
                <Box color="primary.main">{item.icon}</Box>
                <Typography variant="h6" fontWeight={700}>{item.title}</Typography>
                <Typography color="text.secondary" textAlign="center">{item.text}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Box sx={{ py: 10, bgcolor: 'background.paper' }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight={800} gutterBottom>Platform Statistics</Typography>
          <Grid container spacing={3}>
            {[{ label: 'Active Bids', value: '1,247' }, { label: 'Verified Companies', value: '89' }, { label: 'Total Project Value', value: '$2.4B' }, { label: 'Active Contractors', value: '3,456' }].map((m) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={m.label}>
                <Stack sx={{ p: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3 }} alignItems="center" spacing={1}>
                  <OilBarrelIcon color="primary" />
                  <Typography variant="h4" fontWeight={800}>{m.value}</Typography>
                  <Typography color="text.secondary">{m.label}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
