import firebase from "./firebase"
import store from "./store"
import db from "./db"
import router from "./router"

firebase.auth().onAuthStateChanged(user => {
	//
	if (user) {
		if (user.user) {
			user = user.user
		}
		// console.log(user.uid)
		// console.log(user.displayName)
		// console.log(user.photoURL)

		const zeuser = {
			id: user.uid,
			name: user.displayName,
			image: user.photoURL,
			create_at: firebase.firestore.FieldValue.serverTimestamp()
		}

		store.commit("SET_USER", zeuser)

		db.collection("users")
			.doc(zeuser.id)
			.set(zeuser)

		router.push("/sujets")
	} else {
		store.commit("SET_USER", null)
		router.push("/")
	}
})
