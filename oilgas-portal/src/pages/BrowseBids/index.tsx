import { Box, Container, Grid, Typography } from '@mui/material';
import { useBids } from '@hooks/useBids';
import { mockBids } from '@mocks/bids.mock';
import Card from '@components/common/Card';
import Badge from '@components/common/Badge';
import { truncate } from '@utils/helpers';
import { usePermissions } from '@hooks/usePermissions';

export default function BrowseBids() {
  const { data } = useBids();
  const { canUseFilters } = usePermissions();

  const bids = data?.items ?? mockBids;

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" gutterBottom>Browse Bids</Typography>
      {!canUseFilters ? (
        <Box sx={{ p: 2, bgcolor: 'warning.light', borderRadius: 1, mb: 2 }}>
          Filtering is a Silver/Gold feature. Upgrade to unlock all filters.
        </Box>
      ) : null}
      <Grid container spacing={3}>
        {bids.map((bid) => (
          <Grid item xs={12} md={6} lg={4} key={bid.id}>
            <Card title={bid.title}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {truncate(bid.description, 120)}
              </Typography>
              <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
                <Badge label={bid.status.toUpperCase()} colorVariant={bid.status as any} />
                <Badge label={bid.industry.replace('_', ' ')} />
                <Badge label={bid.location} />
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
