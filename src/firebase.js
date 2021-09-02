import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCMHhNbgVxOS6WkijZs2slFzC_5BkiIiUY",
    authDomain: "clone-269c4.firebaseapp.com",
    projectId: "clone-269c4",
    storageBucket: "clone-269c4.appspot.com",
    messagingSenderId: "249582119072",
    appId: "1:249582119072:web:c14f993e28723cefbc41c5",
    measurementId: "G-74RBYEPD9W",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
