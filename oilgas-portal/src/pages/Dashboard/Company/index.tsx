import { Grid, Typography } from '@mui/material';
import Card from '@components/common/Card';

export default function CompanyDashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>Company Dashboard</Typography>
      <Grid container spacing={3}>
        {[
          { label: 'Active Projects', value: 5 },
          { label: 'Total Bids Received', value: 48 },
          { label: 'Projects Completed', value: 17 },
          { label: 'Total Spent', value: '$12.4M' },
        ].map((m) => (
          <Grid item xs={12} md={3} key={m.label}>
            <Card title={m.label}>{m.value}</Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
