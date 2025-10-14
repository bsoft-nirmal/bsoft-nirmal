import { Box, Button, Container, Grid, Typography } from '@mui/material';
import Navbar from '@components/common/Navbar';
import Footer from '@components/common/Footer';

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Box sx={{
        minHeight: '60vh',
        backgroundImage: 'url(https://images.unsplash.com/photo-1542718610-a1d656d1884a?q=80&w=2070&auto=format&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
      }}>
        <Container maxWidth="lg">
          <Typography variant="h2" color="white" gutterBottom>
            Discover and Win Oil & Gas Contracts
          </Typography>
          <Typography variant="h6" color="white" sx={{ opacity: 0.9, mb: 3 }}>
            Join contractors and companies bidding on multi-million dollar projects.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ mr: 2 }} href="/signup">Join as Contractor</Button>
          <Button variant="outlined" color="secondary" href="/signup">Join as Company</Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ my: 6 }}>
        <Grid container spacing={3}>
          {[{
            title: 'Verified Companies', desc: 'Work with trusted industry leaders.'
          }, {
            title: 'Powerful Filters', desc: 'Find the right opportunities fast.'
          }, {
            title: 'Secure & Compliant', desc: 'Built for security and compliance.'
          }].map((card) => (
            <Grid item xs={12} md={4} key={card.title}>
              <Box sx={{ p: 3, borderRadius: 2, bgcolor: 'grey.100' }}>
                <Typography variant="h5" gutterBottom>{card.title}</Typography>
                <Typography variant="body1" color="text.secondary">{card.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
}
