export default function numberFormat(value) {
  if (Number.isNaN(Number(value))) {
    return 0;
  }

  return new Intl.NumberFormat().format(value);
}
