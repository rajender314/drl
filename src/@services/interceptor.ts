import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL;
const service = axios.create({ baseURL });
const loginService = axios.create({ baseURL });

const saveToken = (access_token: any, refresh_token: any) => {
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
}

const destroyToken = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
}

const refresh = () => {
    return
    return new Promise((resolve, reject) => {
        service.post('/api/v1/refresh', {
            refresh_token: localStorage.getItem('refresh_token')
        }).then((response) => {
            saveToken(response.data.access_token, response.data.refresh_token);
            return resolve(response.data.access_token);
        }).catch((error) => {
            destroyToken();
            window.location.replace('/login');
            return reject(error);
        });
    });
}

/* service.interceptors.response.use(
    (res) => {

        if (navigator.onLine) {
            // console.log('online', res);
            let url: any = res.config.url
            if (res.config.method == 'get') {
                localStorage.setItem(url, JSON.stringify(res));
            }
        }
        return res
    },
    (error) => {
        let config = error.config;
        if (navigator.onLine) {
            //console.log('online');
        } else {
            //console.log(error.config)
            if (config.method == 'get') {
                let data: any = localStorage.getItem(config.url);
                if (data) {
                    return JSON.parse(data)
                } else {
                    return Promise.reject(error.response);
                }
                //config.url
            }
            //console.log('offline');
        }
        const status = error.response ? error.response.status : null;
        if (status === 401) {
            // login();
            // use below when login flow Added
            // window.location.replace('/drlconsumerapp/login');
            //  localStorage.removeItem('access_token');
            //  localStorage.removeItem('refresh_token');
        }
        // status might be undefined
        if (!status) {
            refresh();
        }
        return Promise.reject(error.response);
    }
); */

service.interceptors.request.use((config:any) => {   
    const access_token = localStorage.getItem('access_token');
    config.headers.Authorization = access_token ? `Bearer ${access_token}` :(config.url).includes("auth") ? 'test' : '';
    return config;
});
export { service };
export {loginService};