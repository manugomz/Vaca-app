import axios from 'axios';

const pathsToBypassAuthentication = [
    {
        path: '/auth/login',
        method: 'post',
    },
    {
        path: '/users',
        method: 'post',
    },
];

export const registerAxiosInterceptors = () => {
    axios.interceptors.request.use(
        function (config) {
            const headers = !pathsToBypassAuthentication.some(
                (element) => config.url.includes(element.path) && element.method === config.method,
            )
                ? { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
                : undefined;

            config.headers = {
                ...config.headers,
                ...headers,
            };
            // Do something before request is sent
            return config;
        },
        function (error) {
            // Do something with request error

            return Promise.reject(error);
        },
    );
};
