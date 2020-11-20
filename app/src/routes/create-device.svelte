<script>
import { gql } from '@apollo/client/core';
import { mutation } from 'svelte-apollo';
import {
  Form,
  FormGroup,
  TextInput,
  Modal,
  Button,
} from 'carbon-components-svelte';

const CREATE_DEVICE = gql`
  mutation createDevice($name: String!) {
    createDevice(name: $name) {
      id
    }
  }
`;
const createDevice = mutation(CREATE_DEVICE);

let deviceName;
let deviceId;
let open;

const submit = async (args) => {
  try {
    const result = await createDevice({ variables: { name } });
    deviceId = result.data.createDevice.id;
    open = true;
  } catch (error) {}
};
</script>

<Form on:submit="{submit}">
  <FormGroup>
    <TextInput bind:value="{deviceName}" size="xl" labelText="Name" placeholder="Enter the name of your device..." />
  </FormGroup>
  <Button type="submit">Create device</Button>
</Form>

<Modal
  passiveModal
  bind:open
  modalHeading="Device registrated successfully"
  on:close
>
  <p>The device was successfully registrated.</p>
  <p><strong>DeviceID: {deviceId}</strong></p>
</Modal>
