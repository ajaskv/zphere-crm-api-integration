import axios from 'axios';
// create an axios instance


const userdata = JSON.parse(JSON.stringify(localStorage.getItem('userDetails')));
const service = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // url = base url + request url
    // timeout: 5000 // request timeout
  
    headers :{
      
      "Access-Control-Allow-Headers": "*",
        'content-type': 'application/json',
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        //Authorization: null
        Authorization: userdata ? 'Bearer ' + userdata.token : null
      }
  });

  // request interceptor do something before request is sent
// service.interceptors.request.use(
//     (config) => {
//      var userDatas = localStorage.getItem('userDetails');
//       headers = {
       
//         'content-type': 'application/json',
//         Accept: 'application/json',
//         'X-Requested-With': 'XMLHttpRequest',
//         Authorization: null
//         Authorization: userDatas ? 'Bearer ' + userDatas.token : null
//       };
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
  // response interceptor
  service.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        alert('Ýour session is expired.Please login again');
        window.location.href = '/';
      } else if (error.response.status === 403) {
        alert(`You don't have permission to access this feature`);
      }
      return Promise.reject(error);
    }
  );
  
  export default service;