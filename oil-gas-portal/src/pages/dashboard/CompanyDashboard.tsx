import { Box, Button, Card, CardContent, Container, Stack, Typography, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function CompanyDashboard() {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={800}>Company Dashboard</Typography>
          <Typography color="text.secondary">Welcome back</Typography>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { icon: '📁', value: 15, label: 'Active Projects' },
            { icon: '👥', value: 142, label: 'Total Bids Received' },
            { icon: '✅', value: 28, label: 'Projects Completed' },
            { icon: '💵', value: '$47M', label: 'Total Spent' },
          ].map((m) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={m.label}>
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
          <Grid size={{ xs: 12, md: 8 }}>
            <Card variant="outlined"><CardContent>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Recent Activity</Typography>
              {[
                { t: 'New bid received', s: 'Offshore Platform Maintenance Contract', time: '2 hours ago' },
                { t: 'Project deadline approaching', s: 'Pipeline Installation - Deadline: Feb 28', time: '4 hours ago' },
                { t: 'Bid review completed', s: 'Selected contractor for Deep Water Drilling', time: '1 day ago' },
              ].map((a) => (
                <Stack key={a.t} direction="row" justifyContent="space-between" sx={{ py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Box>
                    <Typography>{a.t}</Typography>
                    <Typography color="text.secondary" variant="body2">{a.s}</Typography>
                  </Box>
                  <Typography color="text.secondary" variant="body2">{a.time}</Typography>
                </Stack>
              ))}
            </CardContent></Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack spacing={2}>
              <Card variant="outlined"><CardContent>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Quick Actions</Typography>
                <Stack spacing={1}>
                  <Button variant="contained" fullWidth>Post New Project</Button>
                  <Button variant="outlined" fullWidth>Review Bids</Button>
                  <Button variant="outlined" fullWidth>View Reports</Button>
                  <Button variant="outlined" fullWidth>Account Settings</Button>
                </Stack>
              </CardContent></Card>

              <Card variant="outlined"><CardContent>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Performance</Typography>
                {[
                  { label: 'Project Success Rate', value: 94, color: 'success' },
                  { label: 'Within Budget', value: 87, color: 'warning' },
                  { label: 'Avg Response Time', value: 78, color: 'primary' },
                ].map((p) => (
                  <Box key={p.label} sx={{ mb: 2 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                      <Typography variant="body2">{p.label}</Typography>
                      <Typography variant="body2" fontWeight={700}>{p.value}%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={p.value} color={p.color as any} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                ))}
              </CardContent></Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
