import { Container, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useBid } from '@hooks/useBids';
import { mockBids } from '@mocks/bids.mock';

export default function BidDetails() {
  const { id } = useParams();
  const { data } = useBid(id);
  const bid = data ?? mockBids.find((b) => b.id === id);

  if (!bid) return null;

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h3" gutterBottom>{bid.title}</Typography>
      <Typography variant="body1" color="text.secondary">{bid.description}</Typography>
    </Container>
  );
}
