import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../features/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const schema = z.object({ email: z.string().email(), password: z.string().min(1) });

type FormValues = z.infer<typeof schema>;

export default function SignIn() {
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { signIn, demoSignIn } = useAuth();
  const navigate = useNavigate();

  async function onSubmit(values: FormValues) {
    try {
      await signIn(values.email, values.password);
      navigate('/dashboard');
    } catch (e) {
      // In real app, show snackbar
      console.error(e);
    }
  }

  return (
    <Box sx={{ py: 10 }}>
      <Container maxWidth="sm">
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={800}>Sign In</Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <TextField label="Email" type="email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
              <TextField label="Password" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
              <Button type="submit" variant="contained" disabled={isSubmitting}>Sign In</Button>
            </Stack>
          </Box>

          <Typography align="center" color="text.secondary">or</Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <Button fullWidth variant="outlined" onClick={() => demoSignIn('contractor')}>Demo Contractor</Button>
            <Button fullWidth variant="outlined" onClick={() => demoSignIn('company')}>Demo Company</Button>
            <Button fullWidth variant="outlined" onClick={() => demoSignIn('admin')}>Demo Admin</Button>
          </Stack>

          <Button onClick={() => navigate('/signup')}>Don't have an account? Sign up</Button>
        </Stack>
      </Container>
    </Box>
  );
}
