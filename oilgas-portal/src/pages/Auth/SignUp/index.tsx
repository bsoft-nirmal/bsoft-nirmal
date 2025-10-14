import { Button, Checkbox, FormControlLabel, Grid, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@hooks/useAuth';

const schema = z.object({
  role: z.enum(['contractor', 'company']),
  firstName: z.string().min(1, 'Required'),
  lastName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(7, 'Invalid phone number'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Must include uppercase').regex(/[0-9]/, 'Must include number').regex(/[^A-Za-z0-9]/, 'Must include special'),
  confirmPassword: z.string(),
  agree: z.literal(true, { message: 'You must accept Terms & Conditions' }),
}).refine((data) => data.password === data.confirmPassword, { message: 'Passwords do not match', path: ['confirmPassword'] });

type FormValues = z.infer<typeof schema>;

export default function SignUp() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { role: 'contractor' } });
  const { signUp } = useAuth();

  const onSubmit = async (values: FormValues) => {
    await signUp({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      role: values.role as any,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant="h5">Create your account</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <TextField select SelectProps={{ native: true }} label="Role" {...register('role')}>
              <option value="contractor">Contractor</option>
              <option value="company">Company</option>
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="First Name" {...register('firstName')} error={!!errors.firstName} helperText={errors.firstName?.message} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Last Name" {...register('lastName')} error={!!errors.lastName} helperText={errors.lastName?.message} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Phone Number" {...register('phoneNumber')} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Password" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField label="Confirm Password" type="password" {...register('confirmPassword')} error={!!errors.confirmPassword} helperText={errors.confirmPassword?.message} />
          </Grid>
        </Grid>
        <FormControlLabel control={<Checkbox {...register('agree')} />} label="I agree to the Terms & Conditions" />
        <Button type="submit" variant="contained" disabled={isSubmitting}>Create Account</Button>
      </Stack>
    </form>
  );
}
