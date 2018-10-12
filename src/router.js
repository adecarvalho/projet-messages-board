import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Sujets from './views/Sujets.vue'
import Post from './views/Post.vue'
import Visa from './views/Visa.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/sujets',
			name: 'sujets',
			component: Sujets
		},
		{
			path: '/sujet/:name',
			name: 'post',
			component: Post
		},
		{
			path: '/visa/:post_id',
			name: 'visa',
			component: Visa
		}
	]
})
