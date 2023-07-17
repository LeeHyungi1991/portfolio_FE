import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        serverApi: window.api,
        fileServerApi: window.fileApi,
        user: {},
        // accessToken: null,
    },
    getters: {
        // getAccessToken: state => {
        //     return state.accessToken;
        // },
        getUser: state => {
            return state.user;
        },
        getServerApi(state) {
            return state.serverApi;
        },
        getWebsocketApi(state) {
            return (pq) => {
                if (pq.charAt(0) === '/') {
                    pq = pq.substring(1);
                }
                return state.serverApi.url.replace("https://", "wss://").replace("http://", "ws://") + pq;
            }
        },
        getApiStringWithQuery(state) {
            return (p, query) => {
                if (p.charAt(0) === '/') {
                    p = p.substring(1);
                }
                let queryString = '';
                const queryKeys = Object.keys(query);
                for (let i = 0; i < queryKeys.length; i++) {
                    queryString += `${queryKeys[i]}=${query[queryKeys[i]]}&`;
                }
                return `${state.serverApi.url}${p}?${queryString}`;
            }
        },
        getApiString(state) {
            return (p) => {
                if (p.charAt(0) === '/') {
                    p = p.substring(1);
                }
                return `${state.serverApi.url}${p}`
            };
        },
        getFileServerString(state) {
            return (p) => {
                if (!p) {
                    return state.fileServerApi.url;
                }
                if (p.charAt(0) === '/') {
                    p = p.substring(1);
                }
                return `${state.fileServerApi.url}${p}`
            };
        },
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        // setAccessToken(state, token) {
        //     state.accessToken = token;
        // }
    },
    actions: {},
    modules: {}
})
