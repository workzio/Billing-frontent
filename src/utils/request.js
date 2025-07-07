import axios from 'axios'
const baseURLs = {
<<<<<<< HEAD
  development: 'http://localhost:8060/', // API server url (Development)
=======
  development: 'http://168.231.102.58:8060/', // API server url (Development)
>>>>>>> c2084415200b4927070204d83a4aeb64c0a89595
  production: 'https://apibilling.oslogroups.com/', // API server url (Production)
  // staging: 'https://dev.hibiller.com/',  // API server url (Staging)
};

<<<<<<< HEAD
const environment = process.env.NODE_ENV || 'production';
// const environment = 'production';   
=======
//const environment = process.env.NODE_ENV || 'development';
const environment = 'production';
>>>>>>> c2084415200b4927070204d83a4aeb64c0a89595

const request = axios.create({
  baseURL: baseURLs[environment],
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

<<<<<<< HEAD
export default request
=======
export default request
>>>>>>> c2084415200b4927070204d83a4aeb64c0a89595
