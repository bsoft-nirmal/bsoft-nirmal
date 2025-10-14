import { Box, Card, CardContent, Container, Stack, Typography, Button, Chip, LinearProgress } from '@mui/material';
import Grid from '@mui/material/Grid';

export default function AdminDashboard() {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Stack spacing={1} sx={{ mb: 3 }}>
          <Typography variant="h4" fontWeight={800}>Admin Dashboard</Typography>
          <Typography color="text.secondary">Platform Management & Analytics</Typography>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[
            { icon: '👥', value: '3,456', label: 'Total Users' },
            { icon: '🏢', value: '89', label: 'Active Companies' },
            { icon: '📄', value: '1,247', label: 'Active Bids' },
            { icon: '📈', value: '$2.4B', label: 'Platform Volume' },
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
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined"><CardContent>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Recent Registrations</Typography>
              {[
                { user: 'John Smith', role: 'Contractor', joined: 'Today', status: 'Pending', action: 'Approve' },
                { user: 'TotalEnergies', role: 'Company', joined: 'Yesterday', status: 'Verified', action: 'View' },
              ].map((r) => (
                <Stack key={r.user} direction="row" alignItems="center" spacing={2} sx={{ py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
                  <Typography sx={{ width: 160 }}>{r.user}</Typography>
                  <Typography color="text.secondary" sx={{ width: 120 }}>{r.role}</Typography>
                  <Typography color="text.secondary" sx={{ width: 120 }}>{r.joined}</Typography>
                  <Chip size="small" label={r.status} color={r.status === 'Pending' ? 'success' : 'warning'} />
                  <Button variant="outlined" size="small" sx={{ ml: 'auto' }}>{r.action}</Button>
                </Stack>
              ))}
            </CardContent></Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined"><CardContent>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>Platform Analytics</Typography>
              {[
                { label: 'Monthly Growth - New Users', value: 62, color: 'success' },
                { label: 'Active Bids', value: 78, color: 'primary' },
                { label: 'Platform Revenue', value: 85, color: 'warning' },
              ].map((p) => (
                <Box key={p.label} sx={{ mb: 2 }}>
                  <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                    <Typography variant="body2">{p.label}</Typography>
                    <Typography variant="body2" fontWeight={700}>+{p.value}%</Typography>
                  </Stack>
                  <LinearProgress variant="determinate" value={p.value} color={p.color as any} sx={{ height: 8, borderRadius: 4 }} />
                </Box>
              ))}
            </CardContent></Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
