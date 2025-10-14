import { Box, Button, Card, CardContent, Container, Stack, Typography, Chip } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function ContractorDashboard() {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={800}>Contractor Dashboard</Typography>
          <Typography color="text.secondary">Welcome back</Typography>
        </Stack>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { icon: '📄', value: 8, label: 'Active Applications' },
            { icon: '⏱️', value: 3, label: 'Pending Reviews' },
            { icon: '🏆', value: 12, label: 'Won Contracts' },
            { icon: '👁️', value: 247, label: 'Profile Views' },
          ].map((m) => (
            <Grid item xs={12} sm={6} md={3} key={m.label}>
              <Card variant="outlined"><CardContent>
                <Stack alignItems="center" spacing={1}>
                  <Typography>{m.icon}</Typography>
                  <Typography variant="h4" fontWeight={800}>{m.value}</Typography>
                  <Typography color="text.secondary">{m.label}</Typography>
                </Stack>
              </CardContent></Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card variant="outlined"><CardContent>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Recent Applications</Typography>
              {[{ p: 'Offshore Platform Maintenance', company: 'Shell International', budget: '$5-10M', applied: 'Jan 15', status: 'Pending' },
                { p: 'Pipeline Installation', company: 'ExxonMobil', budget: '$2-5M', applied: 'Jan 8', status: 'Shortlisted' },
                { p: 'Deep Water Drilling', company: 'BP Exploration', budget: '$8-15M', applied: 'Jan 3', status: 'Rejected' },
              ].map((r) => (
                <Stack key={r.p} direction="row" justifyContent="space-between" sx={{ py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography>{r.p}</Typography>
                  <Typography color="text.secondary" sx={{ flex: 1, mx: 2 }}>{r.company}</Typography>
                  <Typography color="text.secondary" sx={{ width: 100 }}>{r.budget}</Typography>
                  <Typography color="text.secondary" sx={{ width: 80 }}>{r.applied}</Typography>
                  <Chip size="small" label={r.status} color={r.status === 'Pending' ? 'success' : r.status === 'Shortlisted' ? 'warning' : 'error'} />
                </Stack>
              ))}
              <Button variant="outlined" sx={{ mt: 2 }}>Browse More Opportunities</Button>
            </CardContent></Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              <Card variant="outlined"><CardContent>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Membership Status</Typography>
                <Stack alignItems="center" spacing={1}>
                  <Typography variant="h5" fontWeight={800} color="warning.main">Bronze</Typography>
                  <Typography color="text.secondary">Limited to 100 bids</Typography>
                  <Button variant="contained" fullWidth>Upgrade to Silver</Button>
                </Stack>
              </CardContent></Card>

              <Card variant="outlined"><CardContent>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Quick Actions</Typography>
                <Stack spacing={1}>
                  <Button variant="outlined" fullWidth>Browse New Bids</Button>
                  <Button variant="outlined" fullWidth>Update Profile</Button>
                  <Button variant="outlined" fullWidth>Upload Documents</Button>
                  <Button variant="outlined" fullWidth>Settings</Button>
                </Stack>
              </CardContent></Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
