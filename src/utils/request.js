import axios from 'axios'
const baseURLs = {
  development: 'http://168.231.102.58:8060/', // API server url (Development)
  production: 'https://apibilling.oslogroups.com/', // API server url (Production)
  // staging: 'https://dev.hibiller.com/',  // API server url (Staging)
};

//const environment = process.env.NODE_ENV || 'development';
const environment = 'production';

const request = axios.create({
  baseURL: baseURLs[environment],
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

export default request
