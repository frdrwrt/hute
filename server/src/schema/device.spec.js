import { integration } from '../testing/index.js';

const { Tester } = integration();

it('should get all devices', async () => {
  await Tester.hasDevices([{ name: 'Device 1' }, { name: 'Device 2' }]);

  const result = await Tester.query({
    query: `
query {
  devices {
    id
    name
  }
}
`,
  });

  expect(result.errors).toBeUndefined();
  expect(result.data).toEqual({
    devices: [
      {
        id: expect.any(String),
        name: 'Device 1',
      },
      {
        id: expect.any(String),
        name: 'Device 2',
      },
    ],
  });
});

it('should get device by id', async () => {
  const device = await Tester.hasDevice({ name: 'Device 1' });

  const result = await Tester.query({
    query: `
      query device($id: ID!){
        device(id: $id) {
          name
        }
      }
    `,
    variables: { id: device.id },
  });

  expect(result.errors).toBeUndefined();
  expect(result.data).toEqual({
    device: {
      name: 'Device 1',
    },
  });
});

it('should create devices', async () => {
  const result = await Tester.mutate({
    mutation: `
  mutation createDevice($name: String!) {
    createDevice(name: $name) {
      id,
      name
    }
  } 
`,
    variables: { name: 'New device' },
  });

  expect(result.errors).toBeUndefined();
  expect(result.data).toEqual({
    createDevice: {
      id: expect.any(String),
      name: 'New device',
    },
  });

  const devices = await Tester.grabFromDB('devices');

  expect(devices).toContainEqual({
    id: expect.any(String),
    name: 'New device',
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
  });
});

it('should update device', async () => {
  const [device1, device2] = await Tester.hasDevices([{ name: 'Device 1' }, { name: 'Device 2' }]);

  const updatedDevice = await Tester.mutate({
    mutation: `
      mutation updateDevice($deviceId: ID! $deviceName: String) {
        updateDevice(id: $deviceId, name: $deviceName) {
          id, 
          name
        }
      }
    `,
    variables: { deviceId: device1.id, deviceName: 'Device updated' },
  });

  expect(updatedDevice.errors).toBeUndefined();

  expect(updatedDevice.data.updateDevice).toEqual({
    id: device1.id,
    name: 'Device updated',
  });

  const [devicesInDB] = await Tester.grabFromDB('devices', { id: device1.id });
  expect(devicesInDB).toMatchObject({
    id: device1.id,
    name: 'Device updated',
  });

  const [devicesInDB2] = await Tester.grabFromDB('devices', { id: device2.id });
  expect(devicesInDB2).toMatchObject({
    id: device2.id,
    name: 'Device 2',
  });
});

it('should delete device', async () => {
  const [device1, device2] = await Tester.hasDevices([{ name: 'Device 1' }, { name: 'Device 2' }]);
  const result = await Tester.mutate({
    mutation: `
      mutation deleteDevice($id: ID!) {
        deleteDevice(id: $id)
      }
    `,
    variables: { id: device1.id },
  });

  expect(result.errors).toBeUndefined();

  const devicesInDB = await Tester.grabFromDB('devices');

  expect(devicesInDB).toHaveLength(1);
  expect(devicesInDB[0]).toMatchObject({
    id: device2.id,
    name: 'Device 2',
  });
});
