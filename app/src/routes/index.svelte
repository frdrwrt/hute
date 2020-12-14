<script>
  import { onMount } from 'svelte';
  import { query } from 'svelte-apollo';
  import { goto } from '@sapper/app';
  import { Row, Column, Grid, AspectRatio, Tile, Loading } from 'carbon-components-svelte';
  import { GET_DEVICES } from '../queries';

  const devices = query(GET_DEVICES);

  const handleDeviceClick = async (device) => {
    await goto(`/device/${device.id}`);
  };

  onMount(async () => {
    devices.refetch();
  });
</script>

<Grid>
  {#if $devices.loading}
    <Loading />
  {:else if $devices.error}
    ERROR:
    {$devices.error.message}
  {:else}
    <Row>
      <Column style="display: flex;flex-flow: row wrap">
        {#each $devices.data.devices as device}
          <AspectRatio ratio="1x1" style="width: 350px; margin: 16px;">
            <Tile style="height: 100%" on:click={() => handleDeviceClick(device)}>
              <h3>{device.name}</h3>
            </Tile>
          </AspectRatio>
        {/each}
      </Column>
    </Row>
  {/if}
</Grid>
