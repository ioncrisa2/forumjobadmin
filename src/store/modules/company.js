import Api from "@/axios.js";

const company = {
    namespaced:true,

    state:{
        companies:[],
        company:{},
        page: 1
    },

    mutations:{
        SET_COMPANIES_DATA(state, companies){
            state.companies = companies;
        },
        SET_COMPANY_DATA(state, company){
            state.company = company;
        },
        SET_PAGE(state, payload){
            state.page = payload;
        }
    },

    actions:{
        getCompaniesData({commit}){
            return new Promise((resolve, reject) => {
                Api.get('/companies')
                    .then((response) => {
                        commit('SET_COMPANIES_DATA',response.data);

                        resolve(response.data.data);
                    });
            });
        },
        getCompanyData({commit}, id) {
            return new Promise((resolve, reject) => {
                Api.get(`/companies/${id}`)
                    .then((response) => {
                        commit('SET_COMPANY_DATA', response.data.data);
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        },
        storeCompanyData({dispatch}, data){
            return new Promise((resolve, reject) => {
                Api.post('/companies',data)
                    .then(() => {
                        dispatch('getCompaniesData');
                        resolve();
                    })
                    .catch( error => {
                        reject(error);
                    });
            })
        },
        updateCompany({dispatch}, {id,data}){
            return new Promise((resolve,reject) => {
                Api.put(`/companies/${id}`, data)
                    .then(() => {
                        dispatch("getCompaniesData");
                        resolve();
                    }).catch(error => reject(error));
            });
        },
        deleteCompanyData({dispatch},id){
            return new Promise((resolve,reject) => {
                Api.delete(`/companies/${id}`)
                    .then(() => {
                        dispatch('getCompaniesData');
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        }
    },

    getters:{
        getAllCompanies: (state) => state.companies,
        getCompany : (state) => state.company
    }

};

export default company;