import { Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@hooks/useAuth';
import { useNavigate, useLocation, Link as RouterLink } from 'react-router-dom';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  remember: z.boolean().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function SignIn() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const onSubmit = async (values: FormValues) => {
    await signIn(values.email, values.password);
    const redirect = location.state?.from?.pathname || '/';
    navigate(redirect, { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="h5">Sign In</Typography>
        <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
        <TextField label="Password" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
        <FormControlLabel control={<Checkbox {...register('remember')} />} label="Remember me" />
        <Button type="submit" variant="contained" disabled={isSubmitting}>Sign In</Button>
        <Typography variant="body2">No account? <RouterLink to="/signup">Sign up</RouterLink></Typography>
        <Stack direction="row" spacing={1}>
          <Button variant="outlined">Sign in with Google</Button>
          <Button variant="outlined">Sign in with LinkedIn</Button>
        </Stack>
        <Typography variant="body2">Demo: contractor@example.com, company@example.com, admin@example.com (any password)</Typography>
      </Stack>
    </form>
  );
}
