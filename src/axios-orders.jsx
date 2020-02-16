import axios from 'axios';

const instanceAxios = axios.create(
    {
        baseURL: 'https://react-burger-app-84b45.firebaseio.com/'
      }
);

export default instanceAxios;