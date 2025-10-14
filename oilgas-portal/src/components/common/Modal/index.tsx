import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import type { DialogProps } from '@mui/material';
import type { ReactNode } from 'react';

type Props = DialogProps & { title?: ReactNode; actions?: ReactNode };

export default function Modal({ title, actions, children, ...rest }: Props) {
  return (
    <Dialog fullWidth maxWidth="sm" {...rest}>
      {title ? <DialogTitle>{title}</DialogTitle> : null}
      <DialogContent dividers>{children}</DialogContent>
      {actions ? <DialogActions>{actions}</DialogActions> : null}
    </Dialog>
  );
}
