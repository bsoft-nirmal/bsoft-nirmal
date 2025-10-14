import { Container, Grid, Paper, Stack, Typography, Button } from '@mui/material';

export default function Membership() {
  return (
    <Container maxWidth="lg" sx={{ my: 6 }}>
      <Typography variant="h4" gutterBottom>Membership Plans</Typography>
      <Grid container spacing={3}>
        {[
          { tier: 'Bronze', price: '$0', features: ['Browse last 100 bids'] },
          { tier: 'Silver', price: '$49/mo', features: ['Full filters', 'Priority support'] },
          { tier: 'Gold', price: '$99/mo', features: ['Everything in Silver', 'Analytics dashboard'] },
        ].map((plan) => (
          <Grid item xs={12} md={4} key={plan.tier}>
            <Paper sx={{ p: 3 }}>
              <Stack spacing={1}>
                <Typography variant="h5">{plan.tier}</Typography>
                <Typography variant="h6" color="secondary">{plan.price}</Typography>
                {plan.features.map((f) => (
                  <Typography key={f} variant="body2">• {f}</Typography>
                ))}
                <Button variant="contained">Choose {plan.tier}</Button>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
