import { useMemo, useState } from 'react';
import type { BidFilters } from '@models/bid.types';

export function useFilters(initial: BidFilters = {}) {
  const [filters, setFilters] = useState<BidFilters>(initial);

  const clearAll = () => setFilters({});

  const hasFilters = useMemo(() => Object.keys(filters).length > 0, [filters]);

  return { filters, setFilters, clearAll, hasFilters } as const;
}
