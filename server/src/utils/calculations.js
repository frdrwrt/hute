export const calculateDewPoint = (temperature, humidity) => {
  const a = 7.5;
  const b = 237.4;

  const SDD = 6.1078 * 10 ** ((a * temperature) / (b + temperature));
  const DD = (humidity / 100) * SDD;
  const v = Math.log10(DD / 6.1078);
  const d = (b * v) / (a - v);
  return Math.round((d + Number.EPSILON) * 10) / 10;
};
