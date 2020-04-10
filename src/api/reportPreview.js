import axios from 'axios'

export function getData() {
  return axios.get('/data/static/js/demo_data.json');
}