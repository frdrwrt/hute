import { db } from '../db.js';
import Device from './Device.js';
import Record from './Record.js';

export default {
  device: new Device(db),
  record: new Record(db),
};
