import axios from "axios";
import router from "@/router";
import store from "@/store";

export default {
    install(Vue, options) {
        Vue.prototype.$refresh = function () {
            axios.get(store.getters.getApiString("api/v1/refresh"), {withCredentials: true})
                .then(response => {
                    if (!response.data.success) {
                        router.push({name: "Login"});
                    } else if (response.data.token) {
                        window.localStorage.setItem("access-token", response.data.token);
                        // store.commit("setAccessToken", response.data.token);
                        return;
                    }
                }).catch(reason1 => {
                router.push({name: "Login"});
            });
        }
        Vue.prototype.$axiosGetWithAuth = function (url, config) {
            if (!config) {
                config = {};
            }
            config.withCredentials = true;
            if (!config.headers) {
                config.headers = {};
            }
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('access-token')}`;
            // config.headers['Authorization'] = `Bearer ${store.getters.getAccessToken}`;
            return axios.get(url, config).then(response => {
                if (response.data === '401 UNAUTHORIZED') {
                    router.push({name: "Login"});
                } else {
                    window.localStorage.setItem("access-token", response.data.token);
                    // store.commit("setAccessToken", response.data.token);
                }
                return response;
            });
        }
        Vue.prototype.$axiosPostWithAuth = function (url, data, config) {
            if (!config) {
                config = {};
            }
            config.withCredentials = true;
            if (!config.headers) {
                config.headers = {};
            }
            config.headers['Authorization'] = `Bearer ${localStorage.getItem('access-token')}`;
            // config.headers['Authorization'] = `Bearer ${store.getters.getAccessToken}`;
            return axios.post(url, data, config).then(response => {
                if (response.data === '401 UNAUTHORIZED') {
                    router.push({name: "Login"});
                } else {
                    window.localStorage.setItem("access-token", response.data.token);
                    // store.commit("setAccessToken", response.data.token);
                }
                return response;
            });
        }
    }
}
