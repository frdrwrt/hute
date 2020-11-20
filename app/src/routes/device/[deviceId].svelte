<script context="module">
export async function preload({ params }) {
  return { ...params };
}
</script>

<script>
import { onMount } from 'svelte';
import { gql } from '@apollo/client/core';
import { query } from 'svelte-apollo';
import merge from 'lodash.merge';
import clone from 'lodash.clonedeep';
import {
  Row,
  Column,
  Grid,
  ContentSwitcher,
  Switch,
  AspectRatio,
  Tile,
  TileGroup,
  Loading,
  Button,
  ButtonSet,
} from 'carbon-components-svelte';
import Edit24 from 'carbon-icons-svelte/lib/Edit24';
import TrashCan24 from 'carbon-icons-svelte/lib/TrashCan24';

let LineChart;

import DaySwitcher from '../../components/graphs/DaySwitcher.svelte';

onMount(async () => {
  const module = await import('@carbon/charts-svelte');
  LineChart = module.LineChart;
});

const daysFromNow = (days) => {
  const offset = 24 * 60 * 60 * 1000 * days;
  const date = new Date(Date.now() - offset);
  return date.toISOString();
};

export let deviceId;

const RECORDS = gql`
  query records($deviceId: ID!, $from: Date!) {
    recordsForDevice(deviceId: $deviceId, from: $from) {
      time
      temperature
      humidity
      dewPoint
    }
  }
`;

const DEVICE = gql`
  query device($deviceId: ID!) {
    device(id: $deviceId) {
      name
    }
  }
`;

let device = query(DEVICE, { variables: { deviceId } });
let records = query(RECORDS, { variables: { deviceId, from: daysFromNow(3) } });

const handleDaysSelected = (event) => {
  records = query(RECORDS, { variables: { deviceId, from: daysFromNow(event.detail) } });
};

const addGroup = (records, group, value) => {
  return records.map((record) => {
    console.log(value, record);
    return {
      group: group,
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
<Grid>
  <Row>
    <Column>
      {#if $device.data}
        <h1>{$device.data.device.name}</h1>
        <br />
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
          icon="{Edit24}"
        />
        <Button
          hasIconOnly
          kind="danger-ghost"
          iconDescription="Delete device"
          tooltipPosition="bottom"
          tooltipAlignment="center"
          icon="{TrashCan24}"
        />
    </Column>
  </Row>
  <Row>
    <Column />
    <Column>
      <DaySwitcher on:change="{handleDaysSelected}" />
    </Column>
  </Row>
  {#if $records.loading}
    <Column>
      <Loading withOverlay="{false}" small style="margin: auto;" />
    </Column>
  {:else if $records.error}
    ERROR:
    {$records.error}
  {:else}
    <Row>
      <Column>
        <svelte:component
          this="{LineChart}"
          data="{[...addGroup($records.data.recordsForDevice, 'Temperature', 'temperature'), ...addGroup($records.data.recordsForDevice, 'Dew Point', 'dewPoint')]}"
          options="{temperatureGraphOptions}"
        />
      </Column>
    </Row>
    <Row>
      <Column>
        <svelte:component
          this="{LineChart}"
          data="{addGroup($records.data.recordsForDevice, 'Humidity', 'humidity')}"
          options="{humidityGraphOptions}"
        />
      </Column>
    </Row>
  {/if}
</Grid>
