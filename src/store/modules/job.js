import Api from "@/axios.js";

const job = {
    namespaced: true,
    state:{
        jobs:[],
        job:{},
        page: 1
    },
    mutations:{
        SET_JOBS_DATA(state, jobs){
            state.jobs = jobs;
        },
        SET_JOB_DATA(state, job){
            state.job = job;
        },
        SET_PAGE(state, payload){
            state.page = payload;
        }
    },
    actions:{
        getJobsData({commit}){
            return new Promise((resolve, reject) => {
                Api.get('/jobs')
                    .then((response) => {
                        commit('SET_JOBS_DATA',response.data.data);
                        resolve(response.data.data);
                    })
            });
        },
        getJobData({commit}, id){
            return new Promise((resolve,reject) => {
                Api.get(`/jobs/${id}`)  
                    .then((response) => {
                        commit('SET_JOB_DATA', response.data.data);
                        resolve();
                    }).catch(error => reject(error));
            });
        },
        storeJobData({dispatch}, data){
            Api.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
            return new Promise((resolve, reject) => {
                Api.post('/jobs', data)
                    .then(() => {
                        dispatch('getJobsData');
                        resolve();
                    })
                    .catch( error => reject(error));
            });
        },
        updateJobData({dispatch}, {id, data}){
            return new Promise((resolve, reject) => {
                Api.post(`/jobs/${id}`, data)
                    .then(() => {
                        dispatch("getJobsData");
                        resolve();
                    }).catch(error => reject(error));
            });
        },
        deleteJobData({dispatch},id){
            return new Promise((resolve, reject) => {
                Api.delete(`/jobs/${id}`)
                    .then(() => {
                        dispatch('getJobsData');
                        resolve();
                    })
                    .catch(error => reject(error));
            })
        },
    },
    getters:{
        getJobsData: (state) => state.jobs,
        getJobData: (state) => state.job
    }
};

export default job;