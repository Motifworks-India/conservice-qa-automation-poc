export function addCommasToNumber(number: number | string): string {
  const num = typeof number === 'string' ? number : number.toString();
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function addPeriodsToNumber(number: number | string): string {
  const num = typeof number === 'string' ? number.replace('.', ',') : number.toString().replace('.', ',');
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function commaForDecimalPlace(number: number | string): string {
  const num = typeof number === 'string' ? Number(number) : number;
  return num.toFixed(2).replace('.', ',');
}

export function addDecimalToNumber(number: string | number): string {
  const num = typeof number === 'string' ? Number(number) : number;
  const numToDecimal = num.toFixed(2);
  return numToDecimal;
}

export function roundToDecimalPlace(number: number | string, decimalPlace: number | string): string {
  const num = typeof number === 'number' ? number : Number(number);
  const decimalPosition = typeof decimalPlace === 'number' ? decimalPlace : Number(decimalPlace);
  if (decimalPosition <= 0) {
    console.error('Decimal Place Must Be Whole Integer Starting at 1');
  }
  return (Math.round(num * (10 ^ (decimalPosition - 1))) / (10 ^ (decimalPosition - 1))).toFixed(decimalPosition);
}
