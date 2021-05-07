import firebase from "firebase/app";
import "firebase/database";

const config = {
	apiKey: "AIzaSyDeBU9JukjJQH9nMzJzkj_AMCtTDMhFTTQ",
    authDomain: "aloha-pwa.firebaseapp.com",
    projectId: "aloha-pwa",
    storageBucket: "aloha-pwa.appspot.com",
    messagingSenderId: "603412586600",
    appId: "1:603412586600:web:dd09fd217e07a8441c5bdd"
}

const db = firebase.initializeApp(config);
export default db;