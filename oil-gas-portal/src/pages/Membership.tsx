import { Box, Button, Card, CardActions, CardContent, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useAuth } from '../features/auth/AuthContext';

const TIERS = [
  { id: 'BRONZE', price: 'Free', features: ['Browse last 100 bids', 'Basic profile', 'Email support', 'Standard application process'] },
  { id: 'SILVER', price: '$29/month', features: ['Unlimited bid access', 'Advanced filters', 'Priority support', 'Enhanced profile', 'Application analytics'] },
  { id: 'GOLD', price: '$79/month', features: ['All Silver features', 'Early bid access', 'Dedicated account manager', 'Custom reporting', 'API access', 'White-label options'] },
] as const;

export default function Membership() {
  const { user, upgradeMembership } = useAuth();

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Stack spacing={1} textAlign="center" sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={800}>Choose Your Membership Plan</Typography>
          <Typography color="text.secondary">Unlock more features and opportunities</Typography>
        </Stack>
        <Grid container spacing={3}>
          {TIERS.map((t) => {
            const isCurrent = user?.membershipTier === t.id;
            return (
              <Grid size={{ xs: 12, md: 4 }} key={t.id}>
                <Card variant="outlined" sx={{ borderWidth: 2, borderColor: isCurrent ? 'primary.main' : 'divider' }}>
                  <CardContent>
                    <Stack spacing={1} textAlign="center">
                      <Typography variant="h5" fontWeight={800} color={t.id === 'BRONZE' ? 'text.primary' : t.id === 'SILVER' ? 'grey.600' : 'warning.main'}>{t.id}</Typography>
                      <Typography variant="h4" fontWeight={800}>{t.price}</Typography>
                      <Stack component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }} spacing={1}>
                        {t.features.map((f) => (<Typography key={f} component="li" color="text.secondary">{f}</Typography>))}
                      </Stack>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant={isCurrent ? 'outlined' : 'contained'} disabled={isCurrent} onClick={() => upgradeMembership(t.id as any)}>
                      {isCurrent ? 'Current Plan' : `Upgrade to ${t.id}`}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
