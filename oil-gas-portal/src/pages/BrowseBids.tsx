import { useEffect, useMemo, useState } from 'react';
import { api } from '../api/axios';
import type { Bid } from '../api/axios';
import { Box, Button, Chip, Container, InputAdornment, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography, Card, CardContent, CardActions, Divider, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import SendIcon from '@mui/icons-material/Send';
 
import { useAuth } from '../features/auth/AuthContext';
import { can } from '../features/rbac/rbac';
import dayjs from 'dayjs';

const INDUSTRIES = ['OFFSHORE_OPERATIONS', 'PIPELINE', 'DRILLING', 'REFINING', 'EXPLORATION'] as const;

type Industry = typeof INDUSTRIES[number];

export default function BrowseBids() {
  const { user } = useAuth();
  const [bids, setBids] = useState<Bid[]>([]);
  const [query, setQuery] = useState('');
  const [minM, setMinM] = useState<number | ''>('');
  const [maxM, setMaxM] = useState<number | ''>('');
  const [selected, setSelected] = useState<Industry[]>([]);
  const [sort, setSort] = useState<'deadline' | 'budget' | 'posted'>('deadline');

  useEffect(() => {
    api.get<Bid[]>('/bids').then((r) => setBids(r.data));
  }, []);

  const bronzeCap = 100;

  const filtered = useMemo(() => {
    let next = bids.filter((b) => {
      const q = query.toLowerCase();
      const matchesQ = !q || [b.title, b.description, b.companyName, b.location].some((t) => t.toLowerCase().includes(q));
      const matchesIndustry = selected.length === 0 || selected.includes(b.industry as Industry);
      const minB = (minM || 0) * 1_000_000;
      const maxB = (maxM || Infinity) * 1_000_000;
      const matchesBudget = b.budgetMin >= minB && b.budgetMax <= maxB;
      return matchesQ && matchesIndustry && matchesBudget;
    });

    if (sort === 'deadline') next = next.sort((a, b) => dayjs(a.deadline).valueOf() - dayjs(b.deadline).valueOf());
    if (sort === 'budget') next = next.sort((a, b) => b.budgetMax - a.budgetMax);
    if (sort === 'posted') next = next.sort((a, b) => dayjs(b.postedDate).valueOf() - dayjs(a.postedDate).valueOf());

    if (user?.membershipTier === 'BRONZE') return next.slice(0, bronzeCap);
    return next;
  }, [bids, query, selected, minM, maxM, sort, user?.membershipTier]);

  const advancedFiltersEnabled = user ? can(user.role, user.membershipTier, 'filters.advanced') : false;

  return (
    <Box sx={{ py: 8 }}>
      <Container>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h4" fontWeight={800}>Browse Opportunities</Typography>
            <Typography color="text.secondary">Discover your next big project opportunity</Typography>
          </Box>
          <Stack direction="row" spacing={2}>
            <Select size="small" value={sort} onChange={(e) => setSort(e.target.value as any)}>
              <MenuItem value="deadline">Deadline</MenuItem>
              <MenuItem value="budget">Budget</MenuItem>
              <MenuItem value="posted">Recently Posted</MenuItem>
            </Select>
          </Stack>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack sx={{ position: 'sticky', top: 88 }} spacing={2}>
              <TextField size="small" placeholder="Search opportunities..." value={query} onChange={(e) => setQuery(e.target.value)} InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon /></InputAdornment>) }} />

              <Card variant="outlined">
                <CardContent>
                  <Stack spacing={1}>
                    <Typography fontWeight={700}>Industry Sector</Typography>
                    <ToggleButtonGroup size="small" value={selected} onChange={(_, v) => setSelected(v)} color="primary" orientation="vertical">
                      {INDUSTRIES.map((ind) => (
                        <ToggleButton key={ind} value={ind}>{ind.replace('_', ' ')}</ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Stack spacing={1}>
                    <Typography fontWeight={700}>Budget Range ($M)</Typography>
                    <Stack direction="row" spacing={1}>
                      <TextField size="small" type="number" label="Min" value={minM} onChange={(e) => setMinM(e.target.value === '' ? '' : Number(e.target.value))} />
                      <TextField size="small" type="number" label="Max" value={maxM} onChange={(e) => setMaxM(e.target.value === '' ? '' : Number(e.target.value))} />
                    </Stack>
                  </Stack>
                </CardContent>
                {!advancedFiltersEnabled && user && user.membershipTier === 'BRONZE' && (
                  <CardActions sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', display: 'block' }}>
                    <Typography variant="body2" fontWeight={700}>Upgrade to unlock filters</Typography>
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>Silver & Gold members get advanced filtering</Typography>
                  </CardActions>
                )}
              </Card>

              <Button variant="outlined" onClick={() => { setQuery(''); setSelected([] as any); setMinM(''); setMaxM(''); }}>Clear All Filters</Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 9 }}>
            <Typography sx={{ mb: 2 }}>{filtered.length} opportunities found</Typography>
            <Grid container spacing={2}>
              {filtered.map((b) => (
                <Grid size={{ xs: 12, md: 6 }} key={b.id}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent>
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
                        <Box>
                          <Typography variant="body2" color="text.secondary">{b.companyName}</Typography>
                          <Typography variant="h6" fontWeight={700}>{b.title}</Typography>
                        </Box>
                        <Chip size="small" color={b.status === 'OPEN' ? 'success' : b.status === 'URGENT' ? 'error' : 'default'} label={b.status} />
                      </Stack>
                      <Typography color="text.secondary" sx={{ mb: 1 }}>{b.description}</Typography>
                      <Grid container spacing={1} sx={{ mb: 1 }}>
                        <Grid size={{ xs: 12, sm: 6 }}><Typography variant="body2"><strong>Location:</strong> {b.location}</Typography></Grid>
                        <Grid size={{ xs: 12, sm: 6 }}><Typography variant="body2"><strong>Industry:</strong> {b.industry.replace('_', ' ')}</Typography></Grid>
                        <Grid size={{ xs: 12, sm: 6 }}><Typography variant="body2"><strong>Budget:</strong> ${ (b.budgetMin/1_000_000).toFixed(1)}M - ${ (b.budgetMax/1_000_000).toFixed(1)}M</Typography></Grid>
                        <Grid size={{ xs: 12, sm: 6 }}><Typography variant="body2"><strong>Deadline:</strong> {dayjs(b.deadline).format('MMM D, YYYY')}</Typography></Grid>
                      </Grid>
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {b.requirements.map((r) => (<Chip key={r} label={r} size="small" />))}
                      </Stack>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">{b.applicantCount} applicants • Posted {dayjs(b.postedDate).format('MMM D, YYYY')}</Typography>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined" startIcon={<BookmarkBorderIcon />} onClick={() => api.post('/save', { id: b.id })}>Save</Button>
                        <Button size="small" variant="contained" startIcon={<SendIcon />} disabled={!user || user.role !== 'CONTRACTOR'} onClick={() => api.post('/apply', { id: b.id })}>Apply</Button>
                      </Stack>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
