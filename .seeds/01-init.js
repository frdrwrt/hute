const dateFromNow = ({ days = 0, hours = 0 }) => {
  const daysOffset = 24 * 60 * 60 * 1000 * days;
  const hoursOffset = 60 * 60 * 1000 * hours;
  const date = new Date(Date.now() - daysOffset - hoursOffset);
  return date.toISOString();
};

exports.seed = async (knex) => {
  await Promise.all([knex('devices').del(), knex('records').del()]);

  await knex('devices').insert([
    { id: '11111111-1111-1111-1111-111111111111', name: 'Schlaraffenland' },
    { id: '22222222-2222-2222-2222-222222222222', name: 'Action Direct' },
    { id: '33333333-3333-3333-3333-333333333333', name: 'Sonlerto' },
  ]);

  await knex('records').insert([
    {
      time: dateFromNow({ hours: 1 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 10.0,
      humidity: 50.0,
    },
    {
      time: dateFromNow({ hours: 2 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 11.0,
      humidity: 54.0,
    },
    {
      time: dateFromNow({ hours: 4 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 12.0,
      humidity: 53.0,
    },
    {
      time: dateFromNow({ hours: 5 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 13.0,
      humidity: 55.0,
    },
    {
      time: dateFromNow({ hours: 6 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 16.0,
      humidity: 48.0,
    },
    {
      time: dateFromNow({ hours: 7 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 16.5,
      humidity: 45.0,
    },
    {
      time: dateFromNow({ hours: 8 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 17.0,
      humidity: 42.0,
    },
    {
      time: dateFromNow({ hours: 9 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 18.0,
      humidity: 40.0,
    },
    {
      time: dateFromNow({ hours: 10 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 18.0,
      humidity: 35.0,
    },
    {
      time: dateFromNow({ hours: 11 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 18.0,
      humidity: 30.0,
    },
    {
      time: dateFromNow({ hours: 12 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 17.0,
      humidity: 40.0,
    },
    {
      time: dateFromNow({ hours: 14 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 16.5,
      humidity: 42.0,
    },
    {
      time: dateFromNow({ hours: 15 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 16.2,
      humidity: 40.0,
    },
    {
      time: dateFromNow({ hours: 16 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 16.0,
      humidity: 45.0,
    },
    {
      time: dateFromNow({ hours: 17 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 15.0,
      humidity: 48.0,
    },
    {
      time: dateFromNow({ hours: 18 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 14.0,
      humidity: 50.0,
    },
    {
      time: dateFromNow({ hours: 19 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 13.0,
      humidity: 51.0,
    },
    {
      time: dateFromNow({ hours: 20 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 12.5,
      humidity: 50.0,
    },
    {
      time: dateFromNow({ hours: 21 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 12.0,
      humidity: 52.0,
    },
    {
      time: dateFromNow({ hours: 22 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 11.0,
      humidity: 53.0,
    },
    {
      time: dateFromNow({ hours: 23 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 10.0,
      humidity: 54.0,
    },
    {
      time: dateFromNow({ hours: 24 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 10.0,
      humidity: 58.0,
    },
    {
      time: dateFromNow({ hours: 25 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 9.0,
      humidity: 59.0,
    },
    {
      time: dateFromNow({ hours: 26 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 8.5,
      humidity: 60.0,
    },
    {
      time: dateFromNow({ hours: 27 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 8.0,
      humidity: 61.0,
    },
    {
      time: dateFromNow({ hours: 30 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 9.0,
      humidity: 62.0,
    },
    {
      time: dateFromNow({ hours: 31 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 10.0,
      humidity: 58.0,
    },
    {
      time: dateFromNow({ hours: 32 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 11.0,
      humidity: 57.0,
    },
    {
      time: dateFromNow({ hours: 33 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 12.0,
      humidity: 56.0,
    },
    {
      time: dateFromNow({ hours: 34 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 14.0,
      humidity: 55.0,
    },
    {
      time: dateFromNow({ hours: 35 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 15.0,
      humidity: 54.0,
    },
    {
      time: dateFromNow({ hours: 36 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 15.5,
      humidity: 53.0,
    },
    {
      time: dateFromNow({ hours: 37 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 16.0,
      humidity: 52.0,
    },
    {
      time: dateFromNow({ hours: 38 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 17.0,
      humidity: 51.0,
    },
    {
      time: dateFromNow({ hours: 39 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 17.0,
      humidity: 51.0,
    },
    {
      time: dateFromNow({ hours: 40 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 17.5,
      humidity: 48.0,
    },
    {
      time: dateFromNow({ hours: 41 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 17.0,
      humidity: 51.0,
    },
    {
      time: dateFromNow({ hours: 42 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 16.0,
      humidity: 52.0,
    },
    {
      time: dateFromNow({ hours: 43 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 15.0,
      humidity: 53.0,
    },
    {
      time: dateFromNow({ hours: 44 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 14.5,
      humidity: 54.0,
    },
    {
      time: dateFromNow({ hours: 46 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 14.0,
      humidity: 55.0,
    },
    {
      time: dateFromNow({ hours: 47 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 12.5,
      humidity: 56.0,
    },
    {
      time: dateFromNow({ hours: 48 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 12.0,
      humidity: 57.0,
    },
    {
      time: dateFromNow({ hours: 49 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 10.0,
      humidity: 58.0,
    },
    {
      time: dateFromNow({ hours: 50 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 10.0,
      humidity: 60.0,
    },
    {
      time: dateFromNow({ hours: 51 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 11.0,
      humidity: 61.0,
    },
    {
      time: dateFromNow({ hours: 52 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 12.0,
      humidity: 58.0,
    },
    {
      time: dateFromNow({ hours: 53 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 14.0,
      humidity: 57.0,
    },
    {
      time: dateFromNow({ hours: 54 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 14.5,
      humidity: 56.0,
    },
    {
      time: dateFromNow({ hours: 55 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 16.0,
      humidity: 54.0,
    },
    {
      time: dateFromNow({ hours: 56 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 16.5,
      humidity: 53.0,
    },
    {
      time: dateFromNow({ hours: 57 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 17.0,
      humidity: 51.0,
    },
    {
      time: dateFromNow({ hours: 58 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 18.0,
      humidity: 49.0,
    },
    {
      time: dateFromNow({ hours: 59 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 19.0,
      humidity: 45.0,
    },
    {
      time: dateFromNow({ hours: 60 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 20.0,
      humidity: 38.0,
    },
    {
      time: dateFromNow({ hours: 61 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 21.0,
      humidity: 39.0,
    },
    {
      time: dateFromNow({ hours: 62 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 21.0,
      humidity: 40.0,
    },
    {
      time: dateFromNow({ hours: 63 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 19.0,
      humidity: 41.0,
    },
    {
      time: dateFromNow({ hours: 64 }),
      deviceId: '11111111-1111-1111-1111-111111111111',
      temperature: 18.0,
      humidity: 52.0,
    },
  ]);
};
