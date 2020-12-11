export const daysFromNow = (days) => {
  const offset = 24 * 60 * 60 * 1000 * days;
  const date = new Date(Date.now() - offset);
  return date.toISOString();
};
