import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase, ref } from "firebase/database";
// import { getMessaging } from "firebase/messaging/sw"
import { getMessaging, getToken, onMessage, onBackgroundMessage } from "firebase/messaging";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtraq33KBmaj0rkDAfOdXmEQtVnamrQtc",
  authDomain: "remake-36fe0.firebaseapp.com",
  projectId: "remake-36fe0",
  storageBucket: "remake-36fe0.appspot.com",
  messagingSenderId: "206737336631",
  appId: "1:206737336631:web:55648c3ea182e23c3052b2",
  databaseURL: "https://remake-36fe0-default-rtdb.asia-southeast1.firebasedatabase.app",
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const dbservice = getFirestore(app);
const storage = getStorage();
const messaging = getMessaging(app);
// getToken(messaging, {vapidKey: "BC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE"}).then((currentToken) => {
//     if (currentToken) {
//         new Notification('Notification permission granted.');
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//   });
//   const messages = onMessage(messaging, (payload) => {
//     console.log('Message received. ', payload);
//     // ...
//   });
  
const onSocialClick = async (event) => {
    const {
        target: {name},
    } = event;
    let provider
    if (name === 'g') {
        provider = new GoogleAuthProvider();
    } else {
        provider = new GithubAuthProvider();
    }
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        let credential
        if (name === 'g') {
            credential = GoogleAuthProvider.credentialFromResult(result)
        } else {
            credential = GithubAuthProvider.credentialFromResult(result)
        }
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        let credential
        if (name === 'g') {
            credential = GoogleAuthProvider.credentialFromError(error);
        } else {
            credential = GithubAuthProvider.credentialFromError(error);
        }
        // ...
    });
}


const oDB = getDatabase(app)
const oSubscriptionsinDB = ref(oDB)
// const functions = require('firebase-functions')
// const admin = require('firebase-admin')
// const cors = require('cors')({origin: true})
// const {onRequest} = require("firebase-functions/v2/https");
// const {onDocumentCreated} = require("firebase-functions/v2/firestore");

export {auth, onSocialClick, dbservice, storage, oSubscriptionsinDB, messaging }