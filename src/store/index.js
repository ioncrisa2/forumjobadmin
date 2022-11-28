import {createStore} from "vuex";
import auth from "./modules/auth.js";
import dashboard from "./modules/dashboard.js";

export default createStore({
    modules:{
        auth, dashboard
    }
});