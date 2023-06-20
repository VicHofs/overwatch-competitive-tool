import axios from 'axios';

const owapi = axios.create({ baseURL: 'https://owapi.io/profile/pc/us' });

export default owapi;
