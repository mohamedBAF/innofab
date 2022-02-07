import firebase from 'firebase';


const firebaseConfig = {
  apiKey: "AIzaSyBxHv_fEruzpWVjaJzvF4v1ZmBUxMkrxeI",
  authDomain: "discord-efe1b.firebaseapp.com",
  projectId: "discord-efe1b",
  storageBucket: "discord-efe1b.appspot.com",
  messagingSenderId: "212926813100",
  appId: "1:212926813100:web:6ba091fc91b6d817906009",
  measurementId: "G-ZGCPNM5RFL"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();


export default db;






