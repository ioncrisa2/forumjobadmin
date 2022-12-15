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
        getCompaniesData({commit,state}, page){
            let search = page ? page : '';

            return new Promise((resolve, reject) => {
                Api.get(`/company?q=${search}&page=${state.page}`)
                    .then((response) => {
                        commit('SET_COMPANIES_DATA',response.data.data);

                        resolve();
                    })
            });
        },
        getCompanyData({commit,state}, id) {
            return new Promise((resolve, reject) => {
                Api.get(`/company/${id}`)
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
                Api.post('/company',data)
                    .then(() => {
                        dispatch('getCompaniesData');
                        resolve();
                    })
                    .catch( error => {
                        reject(error);
                    });
            })
        },
        updateCompany({dispatch}, {companyId,data}){
            return new Promise((resolve,reject) => {
                Api.put(`/company/${companyId}`, data)
                    .then(() => {
                        dispatch("getCompaniesData");
                        resolve();
                    }).catch(error => reject(error));
            });
        },
        deleteCompanyData({dispatch},id){
            return new Promise((resolve,reject) => {
                Api.delete(`/company/${id}`)
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