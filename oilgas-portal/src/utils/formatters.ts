import { format } from 'date-fns';

export function formatDate(dateIsoString: string, dateFormat: string = 'PP') {
  return format(new Date(dateIsoString), dateFormat);
}

export function formatCurrency(amount: number, currency: string = 'USD', locale: string = 'en-US') {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
