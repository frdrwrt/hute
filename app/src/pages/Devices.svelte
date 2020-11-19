<script>
import { gql } from '@apollo/client';
import { query } from 'svelte-apollo';

const GET_DEVICES = gql`
  query {
    devices {
      name
      id
    }
  }
`;
const devices = query(GET_DEVICES);
</script>

DEVICES
{#if $devices.loading}
  Loading ...
{:else if $devices.error}
  ERROR:
  {$devices.error.message}
{:else}
  {#each $devices.data.devices as device}{device.name}{/each}
{/if}
