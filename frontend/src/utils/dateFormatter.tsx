export const dataFormatter = new Intl.DateTimeFormat('en-US');

export const valueFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});