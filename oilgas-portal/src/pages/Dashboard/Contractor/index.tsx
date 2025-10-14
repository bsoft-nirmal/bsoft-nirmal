import { Grid, Typography } from '@mui/material';
import Card from '@components/common/Card';

export default function ContractorDashboard() {
  return (
    <>
      <Typography variant="h4" gutterBottom>Contractor Dashboard</Typography>
      <Grid container spacing={3}>
        {[
          { label: 'Active Applications', value: 12 },
          { label: 'Pending Reviews', value: 3 },
          { label: 'Won Contracts', value: 4 },
          { label: 'Profile Views', value: 102 },
        ].map((m) => (
          <Grid item xs={12} md={3} key={m.label}>
            <Card title={m.label}>{m.value}</Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
