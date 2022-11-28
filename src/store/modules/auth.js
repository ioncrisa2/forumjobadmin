import Api from "@/axios.js";

const auth = {
    namespaced: true,
    state:{
        token: localStorage.getItem('token') || '',
        user: JSON.parse(localStorage.getItem('user')) || {},
        profile: {}
    },
    mutations:{
        STORE_USER : (state,user) => {
            state.user = user;
            localStorage.setItem('user',JSON.stringify(user));
        },
        STORE_TOKEN: (state, token) => {
            state.token = token;
            localStorage.setItem('token',token);
        },
        STORE_PROFILE_DATA: (state, profile) => {
            state.profile = profile;
        },
        USER_LOGOUT: (state) => {
            state.user = {};
            state.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        UPDATE_USER_DATA: (state, profile) => {
            state.user = {...state.user, profile};
        }
    },
    actions:{
        login({commit}, user){
            return new Promise((resolve, reject) => {
                Api.post('/login',{
                    email:user.email,
                    password:user.password
                })
                .then(response => {
                    commit('STORE_USER',response.data.user);
                    commit('STORE_TOKEN',response.data.token);
                    resolve(response);
                }).catch(error => {
                    localStorage.removeItem('token');
                    reject(error.response.data);
                });
            });
        },
        logout({commit}){
            return new Promise((resolve) => {
                commit('USER_LOGOUT');
                delete Api.defaults.headers.common['Authorization'];
                resolve();
            });
        },
        updateProfile({commit}, user){
            return new Promise((resolve,reject) => {
                Api.put(`user/${user}`)
                .then(response => {
                    commit('UPDATE_USER_DATA',response.data);
                    resolve(response);
                }).catch(error => {
                    console.error(error);
                    reject(error);
                }) 
            });
        },
        getUserProfile({commit}){
            return new Promise((resolve, reject) => {
                Api.get('/user')
                .then(response => {
                    commit('STORE_PROFILE_DATA',response.data);
                    resolve(response);
                }).catch(error => {
                    console.error(error);
                    reject(error);
                })
            })
        }
    },
    getters:{
        getToken: (state) => state.token,
        getUserData: (state) => state.user,
        getProfileData: (state) => state.profile,
    }
};

export default auth;