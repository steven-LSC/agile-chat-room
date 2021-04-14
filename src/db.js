import firebase from "firebase/app";
import "firebase/database";

const config = {
	apiKey: "AIzaSyBH2cUEKsLhAGMOvs0vUGnc8Puw05SfWXo",
    authDomain: "mixed-vue.firebaseapp.com",
    projectId: "mixed-vue",
    storageBucket: "mixed-vue.appspot.com",
    messagingSenderId: "583679719723",
    appId: "1:583679719723:web:d2eb99ebedf38bd07ced6e"
}

const db = firebase.initializeApp(config);
export default db;