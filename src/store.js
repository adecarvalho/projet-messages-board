import Vue from "vue"
import Vuex from "vuex"
import router from "@/router"

import firebase from "@/firebase"
import db from "@/db"

import { firebaseMutations, firebaseAction } from "vuexfire"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		posts: [],
		sujets: [],
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

	getters: {},

	actions: {
		init: firebaseAction(({ bindFirebaseRef }) => {
			bindFirebaseRef("sujets", db.collection("sujets"))
		}),

		/* initPosts: firebaseAction(({ bindFirebaseRef }) => {
			bindFirebaseRef("posts", db.collection("posts"))
		}), */

		async createNewPost({ commit }, post) {
			const res = db.collection("posts").doc()
			post.id = res.id
			//post.sujet_id=......
			post.user_id = firebase.auth().currentUser.uid
			post.created_at = firebase.firestore.FieldValue.serverTimestamp()
			try {
				await db
					.collection("posts")
					.doc(post.id)
					.set(post)
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
