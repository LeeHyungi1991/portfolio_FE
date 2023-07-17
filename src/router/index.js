import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/views/Main";
import Skill from "@/views/Skill";
import Documents from "@/views/Documents";
import Career from "@/views/Career";
import Login from "@/views/Login";
import axios from "axios";
import store from '@/store';
import Omok from "@/views/Skill/Omok/Omok";
import OpenMap from "@/views/Skill/OpenMap";
import Mail from "@/views/Skill/Mail";
import Scraper from "@/views/Skill/Scraper";
import OmokBoard from "@/views/Skill/Omok/OmokBoard";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Main',
        component: Main
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/skill',
        name: 'Skill',
        component: Skill
    },
    {
        path: '/omok',
        name: 'Omok',
        component: Omok,
        props: true
    },
    {
        path: '/omokBoard',
        name: 'OmokBoard',
        component: OmokBoard,
        props: true
    },
    {
        path: '/openMap',
        name: 'OpenMap',
        component: OpenMap
    },
    {
        path: '/mail',
        name: 'Mail',
        component: Mail
    },
    {
        path: '/scraper',
        name: 'Scraper',
        component: Scraper

    },
    {
        path: '/career',
        name: 'Career',
        component: Career
    },
    {
        path: '/documents',
        name: 'Documents',
        component: Documents
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

async function ping() {
    return await axios.get(store.getters.getApiString("api/v1/ping"), {
        withCredentials: true,
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem("access-token")
            // "Authorization": "Bearer " + store.getters.getAccessToken
        }
    })
}

// function refresh(to, from, next) {
//   axios.get(store.getters.getApiString("api/v1/refresh"), {withCredentials: true})
//       .then(response => {
//         if (!response.data.success) {
//           if (from.name !== 'Login') {
//             if (to.name === 'Login') {
//               next();
//             } else {
//               router.push({name: "Login"});
//             }
//             return;
//           }
//         } else if (response.data.token) {
//           window.localStorage.setItem("token", response.data.token);
//           ping().then(value1 => {
//             if (value1.data == null) {
//               if (from.name !== 'Login') {
//                 if (to.name === 'Login') {
//                   next();
//                 } else {
//                   router.push({name: "Login"});
//                 }
//               }
//             } else {
//               if (to.name === 'Login') {
//                 router.push({name: "Main"});
//               } else {
//                 next();
//               }
//             }
//           });
//           return;
//         }
//         next();
//       }).catch(reason1 => {
//     if (from.name !== 'Login') {
//       if (to.name === 'Login') {
//         next();
//       } else {
//         router.push({name: "Login"});
//       }
//     }
//   });
// }
function validate(to, from, next) {
    ping().then(response => {
        if (response.data === '401 UNAUTHORIZED') {
            if (to.name !== 'Login') {
                router.push({name: "Login"});
            } else {
                next();
            }
            return;
        }
        store.commit("setUser", response.data.data);
        window.localStorage.setItem("access-token", response.data.token);
        // store.commit("setAccessToken", response.data.token);
        if (to.name === 'Login') {
            router.push({name: "Main"});
        } else {
            next();
        }
    }).catch(reason => {
        console.log(reason);
        if (to.name !== 'Login') {
            router.push({name: "Login"});
        }
    });
}

let validated = false;
router.beforeEach((to, from, next) => {
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction) {
        if (to.name !== from.name) {
            if (!validated) {
                validate(to, from, next);
                validated = true;
            } else {
                next();
            }
            setTimeout(function () {
                validated = false;
            }, 100);
        }
    } else {
        next();
    }
});
export default router
