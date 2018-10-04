import Vue from "vue"
import Vuex from "vuex"
import router from "@/router"

import firebase from "@/firebase"
import db from "@/db"

import { firebaseMutations, firebaseAction } from "vuexfire"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		sujets: [],
		user: {},
		isLogIn: false
	},

	mutations: {
		...firebaseMutations,

		SET_USER(state, user) {
			if (user) {
				state.user = user
			} else {
				state.user = {}
			}
		},

		IS_LOGIN(state, val) {
			state.isLogIn = val
		}
	},

	actions: {
		init: firebaseAction(({ bindFirebaseRef }) => {
			bindFirebaseRef("sujets", db.collection("sujets"))
		}),

		logInWithGoogle({ commit }) {
			const provider = new firebase.auth.GoogleAuthProvider()

			firebase
				.auth()
				.signInWithPopup(provider)
				.catch(function(error) {
					console.log(error)
					commit("IS_LOGIN", false)
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
