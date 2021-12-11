import axios from 'axios';
import getConfig from 'next/config';

const restConnector = axios.create({
    baseURL: getConfig().publicRuntimeConfig.BASE_API_URL,
});

export default restConnector;