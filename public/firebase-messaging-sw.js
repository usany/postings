importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

firebase.initializeApp = {
  apiKey: "AIzaSyAtraq33KBmaj0rkDAfOdXmEQtVnamrQtc",
  authDomain: "remake-36fe0.firebaseapp.com",
  databaseURL: "https://remake-36fe0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "remake-36fe0",
  storageBucket: "remake-36fe0.appspot.com",
  messagingSenderId: "206737336631",
  appId: "1:206737336631:web:55648c3ea182e23c3052b2"
};
// const firebaseConfig = {
//   apiKey: "AIzaSyAtraq33KBmaj0rkDAfOdXmEQtVnamrQtc",
//   authDomain: "remake-36fe0.firebaseapp.com",
//   projectId: "remake-36fe0",
//   storageBucket: "remake-36fe0.appspot.com",
//   messagingSenderId: "206737336631",
//   appId: "1:206737336631:web:55648c3ea182e23c3052b2"
// };

const messaging = firebase.messaging()
messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
});

