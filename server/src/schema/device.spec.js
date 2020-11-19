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

it('should create devices', async () => {
  const result = await Tester.mutate({
    mutation: `
  mutation {
    createDevice(name: "New device") {
      id,
      name
    }
  } 
`,
  });

  expect(result.data).toEqual({
    createDevice: {
      id: '1',
      name: 'New device',
    },
  });

  const devices = await Tester.grabFromDB('devices');

  expect(devices).toContain({ id: 1, name: 'New device' });
});
