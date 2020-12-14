<script context="module">
  export async function preload({ params: { deviceId } }) {
    if (deviceId === 'create') {
      return { editMode: false };
    }
    return { deviceId, editMode: true };
  }
</script>

<script>
  import { goto } from '@sapper/app';
  import { query, mutation } from 'svelte-apollo';
  import { Form, FormGroup, TextInput, Modal, Button, ButtonSet } from 'carbon-components-svelte';
  import TrashCan16 from 'carbon-icons-svelte/lib/TrashCan16';
  import Reset16 from 'carbon-icons-svelte/lib/Reset16';
  import { CREATE_DEVICE, DELETE_DEVICE, GET_DEVICE, UPDATE_DEVICE, DELETE_RECORDS } from '../../../queries';

  export let editMode;
  export let deviceId;
  let deviceName;

  let openDeleteModal = false;
  let openResetModal = false;

  if (editMode) {
    const deviceStore = query(GET_DEVICE, { variables: { deviceId } });
    deviceStore.subscribe(({ loading, data, error }) => {
      if (!loading) {
        deviceName = data.device.name;
      }
      if (error) {
        throw error;
      }
    });
  }

  const createDevice = mutation(CREATE_DEVICE);
  const updateDevice = mutation(UPDATE_DEVICE);
  const deleteDevice = mutation(DELETE_DEVICE);
  const deleteRecords = mutation(DELETE_RECORDS);

  const handleCreateDevice = async () => {
    const result = await createDevice({ variables: { deviceName } });
    deviceId = result.data.createDevice.id;
    await goto(`/device/${deviceId}`);
  };

  const handleUpdateDevice = async () => {
    console.log(deviceName);
    await updateDevice({ variables: { deviceId, deviceName } });
    await goto(`/device/${deviceId}`);
  };

  const handleDeleteDevice = async () => {
    await deleteDevice({ variables: { deviceId } });
    openDeleteModal = false;
    await goto(`/`);
  };

  const handleResetDevice = async () => {
    await deleteRecords({ variables: { deviceId } });
    openResetModal = false;
    await goto(`/device/${deviceId}`);
  };
</script>

<h1>{deviceName}</h1>
{#if editMode}
  <Button
    hasIconOnly
    icon={Reset16}
    tooltipPosition="bottom"
    tooltipAlignment="center"
    iconDescription="Reset Records"
    kind="danger-ghost"
    on:click={() => {
      openResetModal = true;
    }} />
  <Button
    hasIconOnly
    icon={TrashCan16}
    tooltipPosition="bottom"
    tooltipAlignment="center"
    iconDescription="Delete Device"
    kind="danger-ghost"
    on:click={() => {
      openDeleteModal = true;
    }} />
{/if}
<Form on:submit={editMode ? handleUpdateDevice : handleCreateDevice}>
  <FormGroup>
    <TextInput bind:value={deviceName} size="xl" labelText="Name" placeholder="Enter the name of your device..." />
  </FormGroup>
  <ButtonSet>
    <Button type="submit">{editMode ? 'Update Device' : 'Create device'}</Button>
  </ButtonSet>
</Form>

<Modal
  size="sm"
  danger
  bind:open={openResetModal}
  modalHeading="Reset Device"
  primaryButtonText="Reset"
  secondaryButtonText="Cancle"
  on:submit={handleResetDevice}
  on:click:button--secondary={() => {
    openResetModal = false;
  }}>
  <p>Are you sure to reset this device?</p>
  <p>This will delete all records for this device</p>
</Modal>

<Modal
  size="sm"
  danger
  bind:open={openDeleteModal}
  modalHeading="Delete Device"
  primaryButtonText="Delete"
  secondaryButtonText="Cancle"
  on:submit={handleDeleteDevice}
  on:click:button--secondary={() => {
    openDeleteModal = false;
  }}>
  <p>Are you sure to delete this device?</p>
  <p>If you just want to delete all records for this device use the reset button</p>
</Modal>
