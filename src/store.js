import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import firebase from '@/firebase'
import db from '@/db'

import { firebaseMutations, firebaseAction } from 'vuexfire'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		posts: [],
		sujets: [],
		the_sujet: [],
		the_post: [],
		user: {},
		isLogIn: false
	},

	mutations: {
		...firebaseMutations,

		SET_USER(state, user) {
			if (user) {
				state.user = user
				state.isLogIn = true
			} else {
				state.user = {}
				state.isLogIn = false
			}
		}
	},

	getters: {
		getTheSujet(state) {
			if (state.the_sujet[0]) {
				return state.the_sujet[0]
			} else {
				return {}
			}
		},
		getThePost(state) {
			if (state.the_post[0]) {
				return state.the_post[0]
			} else {
				return {}
			}
		},

		getUser(state) {
			return state.user
		}
	},

	actions: {
		//
		init: firebaseAction(({ bindFirebaseRef }) => {
			bindFirebaseRef('sujets', db.collection('sujets'))
		}),

		initTheSujet: firebaseAction(({ bindFirebaseRef }, name) => {
			bindFirebaseRef(
				'the_sujet',
				db.collection('sujets').where('name', '==', name)
			)
		}),

		initPosts: firebaseAction(({ bindFirebaseRef }, sujet_id) => {
			bindFirebaseRef(
				'posts',
				db.collection('posts').where('sujet_id', '==', sujet_id)
			)
		}),

		getPostById: firebaseAction(({ bindFirebaseRef }, post_id) => {
			bindFirebaseRef(
				'the_post',
				db.collection('posts').where('id', '==', post_id)
			)
		}),

		async createNewPost({ commit, getters }, post) {
			const res = db.collection('posts').doc()
			post.id = res.id
			post.sujet_id = getters.getTheSujet.id
			post.user_id = firebase.auth().currentUser.uid
			post.user_name = getters.getUser.name
			post.user_image = getters.getUser.image
			post.visa = false
			post.remarques = ''
			post.created_at = firebase.firestore.FieldValue.serverTimestamp()

			try {
				await db
					.collection('posts')
					.doc(post.id)
					.set(post)
			} catch (error) {
				console.error(error)
			}
		},

		async setPostVisa({ commit }, visa) {
			try {
				await db
					.collection('posts')
					.doc(visa.post_id)
					.update({
						visa: true,
						remarques: visa.les_remarques
					})
			} catch (error) {
				console.error(error)
			}
		},

		logInWithGoogle({ commit }) {
			const provider = new firebase.auth.GoogleAuthProvider()

			firebase
				.auth()
				.signInWithPopup(provider)
				.catch(function(error) {
					console.log(error)
				})
		},

		logOut({ commit }) {
			firebase
				.auth()
				.signOut()
				.catch(error => {
					console.log(error)
				})
		}
	}
})
