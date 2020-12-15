<script context="module">
  export async function preload({ params }) {
    return { ...params };
  }
</script>

<script>
  import { query } from 'svelte-apollo';
  import { onMount } from 'svelte';
  import merge from 'lodash.merge';
  import clone from 'lodash.clonedeep';
  import { Row, Column, Grid, Loading, Button } from 'carbon-components-svelte';
  import Edit24 from 'carbon-icons-svelte/lib/Edit24';

  import DaySwitcher from '../../components/graphs/DaySwitcher.svelte';
  import { GET_DEVICE, GET_RECORDS, NEW_RECORD } from '../../queries';
  import { isMobile } from '../../stores';
  import { daysFromNow } from '../../utils';

  let LineChart;

  export let deviceId;

  const deviceStore = query(GET_DEVICE, { variables: { deviceId } });
  let recordsStore = query(GET_RECORDS, { variables: { deviceId, from: daysFromNow(3) } });

  onMount(async () => {
    deviceStore.refetch();
    const module = await import('@carbon/charts-svelte');
    LineChart = module.LineChart;
  });

  const handleDaysSelected = (event) => {
    recordsStore = query(GET_RECORDS, { variables: { deviceId, from: daysFromNow(event.detail) } });

    recordsStore.subscribeToMore({
      document: NEW_RECORD,
      variables: { deviceId },
      updateQuery: (prev, { subscriptionData }) => {
        console.log('New Record: ', subscriptionData.data.newRecord);
        if (!subscriptionData.data) return prev;
        return {
          recordsForDevice: [...prev.recordsForDevice, subscriptionData.data.newRecord],
        };
      },
    });
  };

  const addGroup = (records, group, value) => {
    return records.map((record) => {
      return {
        group,
        time: record.time,
        value: record[value],
      };
    });
  };

  const baseGraphOptions = {
    axes: {
      bottom: {
        scaleType: 'time',
        mapsTo: 'time',
        includeZero: false,
      },
      left: {
        mapsTo: 'value',
        scaleType: 'linear',
        includeZero: false,
      },
    },
    color: { scale: { Temperature: '#da1e28' } },
    timeScale: {
      addSpaceOnEdges: 0,
      showDayName: false,
      timeIntervalFormats: {
        hourly: {
          primary: 'MMM d',
          secondary: 'HH:mm',
        },
      },
    },
    curve: 'curveNatural',
    points: { enabled: false },
    tooltip: {
      showTotal: false,
    },
    legend: {
      position: 'top',
    },
    height: '200px',
  };

  const temperatureGraphOptions = merge(clone(baseGraphOptions), {
    axes: {
      left: {
        title: '°C',
      },
    },
    color: { scale: { Temperature: '#fa4d56', 'Dew Point': '#33b1ff' } },
  });
  const humidityGraphOptions = merge(clone(baseGraphOptions), {
    axes: {
      left: { title: '%' },
    },
    color: { scale: { Humidity: '#4589ff' } },
  });
</script>

<style>
</style>

<Grid>
  <Row>
    <Column>
      {#if $deviceStore.data}
        <h1>{$deviceStore.data.device.name}</h1>
        <p style="font-weight: light; font-size: 0.75rem;">ID: {$deviceStore.data.device.id}</p>
        <br />
        <br />
        <br />
        <br />
      {/if}
    </Column>
    <Column style="display:flex; justify-content:flex-end; align-items: flex-start;">
      <Button
        hasIconOnly
        kind="ghost"
        iconDescription="Edit device"
        tooltipPosition="bottom"
        tooltipAlignment="center"
        href={`/device/edit/${deviceId}`}
        icon={Edit24} />
    </Column>
  </Row>
  <Row>
    {#if !$isMobile}
      <Column />
    {/if}
    <Column>
      <DaySwitcher on:change={handleDaysSelected} />
    </Column>
  </Row>
  {#if $recordsStore.loading}
    <Column>
      <Loading withOverlay={false} small style="margin: auto;" />
    </Column>
  {:else if $recordsStore.error}
    ERROR:
    {$recordsStore.error}
  {:else}
    <Row>
      <Column>
        <svelte:component
          this={LineChart}
          data={[...addGroup($recordsStore.data.recordsForDevice, 'Temperature', 'temperature'), ...addGroup($recordsStore.data.recordsForDevice, 'Dew Point', 'dewPoint')]}
          options={temperatureGraphOptions} />
      </Column>
    </Row>
    <Row>
      <Column>
        <svelte:component
          this={LineChart}
          data={addGroup($recordsStore.data.recordsForDevice, 'Humidity', 'humidity')}
          options={humidityGraphOptions} />
      </Column>
    </Row>
  {/if}
</Grid>
