import { gql } from '@apollo/client/core';

// Get the client inside component file:
// import { getClient } from "sevlte-apollo";
// const client = getClient();
// This can only be done during component initialization not inside an event handler.
// https://github.com/timhall/svelte-apollo/issues/71#issuecomment-729162216

export const GET_RECORDS = gql`
  query records($deviceId: ID!, $from: Date!) {
    recordsForDevice(deviceId: $deviceId, from: $from) {
      time
      temperature
      humidity
      dewPoint
    }
  }
`;

export const NEW_RECORD = gql`
  subscription newRecord($deviceId: ID!) {
    newRecord(deviceId: $deviceId) {
      time
      temperature
      humidity
      dewPoint
    }
  }
`;
export const DELETE_RECORDS = gql`
  mutation deleteRecords($deviceId: ID!) {
    deleteRecordsForDevice(deviceId: $deviceId)
  }
`;

export const GET_DEVICE = gql`
  query device($deviceId: ID!) {
    device(id: $deviceId) {
      id
      name
    }
  }
`;

export const GET_DEVICES = gql`
  query {
    devices {
      id
      name
    }
  }
`;

export const CREATE_DEVICE = gql`
  mutation createDevice($deviceName: String!) {
    createDevice(name: $deviceName) {
      id
    }
  }
`;

export const UPDATE_DEVICE = gql`
  mutation updateDevice($deviceId: ID!, $deviceName: String) {
    updateDevice(id: $deviceId, name: $deviceName) {
      id
    }
  }
`;

export const DELETE_DEVICE = gql`
  mutation deleteDevice($deviceId: ID!) {
    deleteDevice(id: $deviceId)
  }
`;
