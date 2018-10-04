import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"

Vue.use(Router)

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/sujets",
			name: "sujets",
			component: () => import("./views/Sujets.vue")
		},
		{
			path: "/sujet/:name",
			name: "post",
			component: () => import("./views/Post.vue")
		}
	]
})
