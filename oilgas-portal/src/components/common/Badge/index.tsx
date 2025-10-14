import { Chip } from '@mui/material';
import type { ChipProps } from '@mui/material';

type Props = ChipProps & { colorVariant?: 'open' | 'urgent' | 'pending' | 'closed' };

const colorMap: Record<NonNullable<Props['colorVariant']>, string> = {
  open: '#22c55e',
  urgent: '#ef4444',
  pending: '#f59e0b',
  closed: '#6b7280',
};

export default function Badge({ colorVariant, ...rest }: Props) {
  const bgcolor = colorVariant ? colorMap[colorVariant] : undefined;
  return <Chip {...rest} sx={{ bgcolor, color: bgcolor ? '#fff' : undefined, borderRadius: 9999 }} />;
}
