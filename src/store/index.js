import {createStore} from "vuex";
import auth from "./modules/auth.js";
import dashboard from "./modules/dashboard.js";
import company from "./modules/company.js";
import job from "./modules/job.js";

export default createStore({
    modules:{
        auth, dashboard,company,job
    }
});