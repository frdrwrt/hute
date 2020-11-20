import { integration } from '../testing/index.js';

const { Tester } = integration();

let device;
let deviceId;

beforeEach(async () => {
  device = await Tester.hasDevice({ name: 'Test Device' });
  deviceId = device.id;
});

it('should get all records', async () => {
  const [record1, record2] = await Tester.hasRecords([
    { time: '2020-01-02', deviceId, temperature: 12.0, humidity: 30.01 },
    { time: '2020-01-01', deviceId, temperature: 30.5, humidity: 90.5 },
  ]);

  const { errors, data } = await Tester.query({
    query: `
query {
  records {
    deviceId
    time
    temperature
    humidity
  }
}
`,
  });

  expect(errors).toBeUndefined();
  expect(data).toEqual({
    records: [record2, record1],
  });
});

it('should enriche records', async () => {
  await Tester.hasRecords([{ time: '2020-01-02', deviceId, temperature: 10.0, humidity: 60 }]);

  const {
    errors,
    data: {
      records: [record],
    },
  } = await Tester.query({
    query: `
      query {
        records {
          time
          deviceId,
          temperature,
          humidity,
          dewPoint,
        }
      }
  `,
    variables: { deviceId },
  });

  expect(errors).toBeUndefined();
  expect(record).toEqual({
    time: '2020-01-02T00:00:00.000Z',
    deviceId,
    temperature: 10.0,
    humidity: 60,
    dewPoint: 2.6,
  });
});

describe('recordsForDevice', () => {
  const graphQuery = `
      query recordsForDevice($deviceId: ID!, $from: Date, $to: Date) {
        recordsForDevice(deviceId: $deviceId, from: $from, to: $to) {
          time
          deviceId,
          temperature,
          humidity
        }
      }
  `;
  let record1;
  let record2;
  let record3;
  let record4;

  beforeEach(async () => {
    const anotherDevice = await Tester.hasDevice({ name: 'Another Device' });
    [record1, record2, record3, record4] = await Tester.hasRecords([
      { time: '2020-01-01', deviceId, temperature: 12.0, humidity: 50.0 },
      { time: '2020-01-02', deviceId, temperature: 12.0, humidity: 50.0 },
      { time: '2020-01-03', deviceId, temperature: 23.0, humidity: 60.0 },
      { time: '2020-01-04', deviceId, temperature: 23.0, humidity: 60.0 },
      { time: '2020-01-01', deviceId: anotherDevice.id, temperature: 23, humidity: 70.0 },
    ]);
  });

  it('should get records for device', async () => {
    const { errors, data } = await Tester.query({
      query: graphQuery,
      variables: { deviceId },
    });

    expect(errors).toBeUndefined();
    expect(data.recordsForDevice).toHaveLength(4);
    expect(data).toEqual({
      recordsForDevice: [record1, record2, record3, record4],
    });
  });

  it('should get records for device in time range', async () => {
    const { errors, data } = await Tester.query({
      query: graphQuery,
      variables: { deviceId, from: '2020-01-02', to: '2020-01-03' },
    });

    expect(errors).toBeUndefined();
    expect(data.recordsForDevice).toHaveLength(2);
    expect(data).toEqual({
      recordsForDevice: [record2, record3],
    });
  });

  it('should get recrods for device "from" date', async () => {
    const { errors, data } = await Tester.query({
      query: graphQuery,
      variables: { deviceId, from: '2020-01-02' },
    });

    expect(errors).toBeUndefined();
    expect(data.recordsForDevice).toHaveLength(3);
    expect(data).toEqual({
      recordsForDevice: [record2, record3, record4],
    });
  });

  it('should get records for device "to" date', async () => {
    const { errors, data } = await Tester.query({
      query: graphQuery,
      variables: { deviceId, to: '2020-01-03' },
    });

    expect(errors).toBeUndefined();
    expect(data.recordsForDevice).toHaveLength(3);
    expect(data).toEqual({
      recordsForDevice: [record1, record2, record3],
    });
  });
});

it('should create record', async () => {
  const result = await Tester.mutate({
    mutation: `
  mutation createRecord($deviceId: ID!, $temperature: Float, $humidity: Float)  {
    createRecord(deviceId: $deviceId, temperature: $temperature, humidity: $humidity) {
      deviceId,
      temperature,
      humidity,
      dewPoint
    }
  } 
`,
    variables: { deviceId, temperature: 12.0, humidity: 60.5 },
  });

  expect(result.errors).toBeUndefined();
  expect(result.data).toEqual({
    createRecord: {
      deviceId,
      temperature: 12.0,
      humidity: 60.5,
      dewPoint: 4.6,
    },
  });

  const records = await Tester.grabFromDB('records');
  expect(records).toContainEqual({ time: expect.any(String), deviceId, temperature: 12.0, humidity: 60.5 });
});
