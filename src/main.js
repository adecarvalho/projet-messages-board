import Vue from "vue"
import "./plugins/vuetify"

import firebase from "firebase"
import auth from "./auth"
import App from "./App.vue"
import router from "./router"
import store from "./store"

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app")
