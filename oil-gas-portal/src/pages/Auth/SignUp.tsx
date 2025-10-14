import { Box, Button, Container, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../features/auth/AuthContext';
import type { Role } from '../../features/auth/AuthContext';
import { useNavigate, useSearchParams } from 'react-router-dom';

const baseSchema = z.object({
  role: z.enum(['CONTRACTOR', 'COMPANY']),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(6),
  password: z.string().min(8).regex(/[A-Z]/, 'Must include uppercase').regex(/\d/, 'Must include number').regex(/[^A-Za-z0-9]/, 'Must include special char'),
  confirmPassword: z.string().min(1),
  companyName: z.string().optional(),
}).refine((d) => d.password === d.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

type FormValues = z.infer<typeof baseSchema>;

export default function SignUp() {
  const [params] = useSearchParams();
  const defaultRole = (params.get('role')?.toUpperCase() as Role) || 'CONTRACTOR';
  const { handleSubmit, register, formState: { errors, isSubmitting }, setValue, watch } = useForm<FormValues>({ resolver: zodResolver(baseSchema), defaultValues: { role: (defaultRole as any) ?? 'CONTRACTOR' } });
  const { signUp } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(values: FormValues) {
    await signUp({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      role: values.role as any,
      companyName: values.role === 'COMPANY' ? values.companyName : undefined,
      password: values.password,
    });
    navigate('/dashboard');
  }

  const role = watch('role');

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={800}>Sign Up</Typography>

          <Stack>
            <Typography fontWeight={700} sx={{ mb: 1 }}>Choose Your Role</Typography>
            <ToggleButtonGroup exclusive value={role} onChange={(_, v) => v && setValue('role', v)} color="primary">
              <ToggleButton value="CONTRACTOR">Contractor</ToggleButton>
              <ToggleButton value="COMPANY">Company</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}><TextField label="First Name" fullWidth {...register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} /></Grid>
              <Grid size={{ xs: 12, sm: 6 }}><TextField label="Last Name" fullWidth {...register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} /></Grid>
              {role === 'COMPANY' && (
                <Grid size={{ xs: 12 }}><TextField label="Company Name" fullWidth {...register('companyName')} /></Grid>
              )}
              <Grid size={{ xs: 12 }}><TextField label="Email" type="email" fullWidth {...register('email')} error={!!errors.email} helperText={errors.email?.message} /></Grid>
              <Grid size={{ xs: 12 }}><TextField label="Phone Number" fullWidth {...register('phone')} error={!!errors.phone} helperText={errors.phone?.message} /></Grid>
              <Grid size={{ xs: 12 }}><TextField label="Password" type="password" fullWidth {...register('password')} error={!!errors.password} helperText={errors.password?.message} /></Grid>
              <Grid size={{ xs: 12 }}><TextField label="Confirm Password" type="password" fullWidth {...register('confirmPassword')} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} /></Grid>
              <Grid size={{ xs: 12 }}><Button type="submit" fullWidth variant="contained" disabled={isSubmitting}>Create Account</Button></Grid>
            </Grid>
          </Box>

          <Button onClick={() => navigate('/signin')}>Already have an account? Sign in</Button>
        </Stack>
      </Container>
    </Box>
  );
}
