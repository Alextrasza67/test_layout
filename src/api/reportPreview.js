import axios from 'axios'

export function getData() {
  return axios.get('/static/js/demo_data.json');
}