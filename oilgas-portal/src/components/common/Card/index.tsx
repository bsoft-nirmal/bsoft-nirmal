import { Card as MUICard, CardContent, CardHeader } from '@mui/material';
import type { CardProps } from '@mui/material';
import type { ReactNode } from 'react';

type Props = CardProps & { title?: ReactNode; action?: ReactNode };

export default function Card({ title, action, children, ...rest }: Props) {
  return (
    <MUICard elevation={2} sx={{ transition: 'all .2s', '&:hover': { boxShadow: 6 } }} {...rest}>
      {title ? <CardHeader title={title} action={action} /> : null}
      <CardContent>{children}</CardContent>
    </MUICard>
  );
}
