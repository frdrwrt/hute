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
      mutation updateDevice($id: ID! $name: String) {
        updateDevice(name: $name) {
          id, 
          name
        }
      }
    `,
    variables: { id: device1, name: 'Device updated' },
  });
});
