import firebase from "firebase"

const config = {
	apiKey: "AIzaSyCmLVRE6u70XE6XnpL4XhRNYk7Ho8RBJWw",
	authDomain: "projet-tutores-board.firebaseapp.com",
	databaseURL: "https://projet-tutores-board.firebaseio.com",
	projectId: "projet-tutores-board",
	storageBucket: "",
	messagingSenderId: "100502938420"
}
firebase.initializeApp(config)

export default firebase
