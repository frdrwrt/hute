import db from '../db.js';
import Device from './Device.js';

export default {
  device: new Device(db),
};
