import Api from "../../axios";

const dashboard = {
    namespaced: true,
    state: {
        data:[]
    },
    mutations:{
        SET_DASHBOARD_DATA(state,data){
            state.data = data;
        }
    },
    actions:{
        dashboardData({commit}){
            Api.get('/dashboard')
                .then( response => {
                    commit('SET_DASHBOARD_DATA', response.data.data);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    },
    getters:{
        getDashboardData: (state) => state.data,
    },
};

export default dashboard;