import axios from "axios";
import EventBus from "@/eventbus/EventBus";

export const mixin = {
    methods: {
        loginByGoogle(googleResponse) {
            googleResponse.social = "google";
            const that = this;
            axios.post(that.$store.getters.getApiString("/api/v1/social/login"), googleResponse, {
                withCredentials: true,
                headers: {
                    'Access-Control-Allow-Origin': that.$store.getters.getApiString(""),
                    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
                },
                baseURL: that.$store.getters.getApiString("")
            }).then(response => {
                // console.log(response);
                if (!response.data.success) {
                    EventBus.$emit("writeLoginStatus", "계정정보를 확인해주세요");
                } else {
                    window.localStorage.setItem("access-token", response.data.token);
                    // that.$store.commit("setAccessToken", response.data.token);
                    that.$store.commit("setUser", response.data.user);
                    if (that.$route.name === 'Login') {
                        that.$router.push({name: "Main"});
                    }
                }
            }).catch(reason => {
                EventBus.$emit("writeLoginStatus", "계정정보를 확인해주세요");
            }).finally(() => {
                EventBus.$emit("inputEmpty");
            });
        },
        // login(userName, password) {
        //     const that = this;
        //     axios.post(that.$store.getters.getApiString("/api/v1/login"), {
        //         "username": userName,
        //         "password": password
        //     }, {
        //         withCredentials: true,
        //         headers: {
        //             'Access-Control-Allow-Origin': that.$store.getters.getApiString("")
        //         },
        //         baseURL: that.$store.getters.getApiString("")
        //     }).then(response => {
        //         if (!response.data.success) {
        //             EventBus.$emit("writeLoginStatus", "계정정보를 확인해주세요");
        //         } else {
        //             window.localStorage.setItem("access-token", response.data.token);
        //             that.$store.commit("setUser", response.data.user);
        //             if (that.$route.name === 'Login') {
        //                 that.$router.push({name: "Main"});
        //             }
        //         }
        //     }).catch(reason => {
        //         EventBus.$emit("writeLoginStatus", "계정정보를 확인해주세요");
        //     }).finally(() => {
        //         EventBus.$emit("inputEmpty");
        //     });
        // },
        logout() {
            const that = this;
            // that.ping();
            axios.get(that.$store.getters.getApiString("/api/v1/logout"), {
                withCredentials: true,
                baseURL: that.$store.getters.getApiString("")
            }).then(value => {
                window.localStorage.setItem("access-token", null);
                // that.$store.commit("setAccessToken", null);
                that.$router.push({name: "Login"});
            });
        }
    }
}
