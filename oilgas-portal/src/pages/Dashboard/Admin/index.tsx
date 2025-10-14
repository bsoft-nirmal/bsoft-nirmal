import { Grid, Typography } from '@mui/material';
import Card from '@components/common/Card';

export default function AdminDashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Grid container spacing={3}>
        {[
          { label: 'Pending Approvals', value: 2 },
          { label: 'Users', value: 1024 },
          { label: 'Bids', value: 312 },
          { label: 'Reports', value: 7 },
        ].map((m) => (
          <Grid item xs={12} md={3} key={m.label}>
            <Card title={m.label}>{m.value}</Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
