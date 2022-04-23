import axios from 'axios';
import { steamcordToken } from '../config.json';

export default function setAxiosDefaults() {
  axios.defaults.headers.common.Authorization = `Bearer ${steamcordToken}`;
}
