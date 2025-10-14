import { Button as MUIButton, CircularProgress } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import type { ReactNode } from 'react';

type Props = ButtonProps & { loading?: boolean; startIcon?: ReactNode; endIcon?: ReactNode };

export default function Button({ loading, children, disabled, ...rest }: Props) {
  return (
    <MUIButton disabled={disabled || loading} {...rest}>
      {loading ? <CircularProgress size={18} sx={{ mr: 1 }} /> : null}
      {children}
    </MUIButton>
  );
}
