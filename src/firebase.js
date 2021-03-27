// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCd9F0JfBLFQwoYZ08Rwvbr85Vdbc7E4wQ",
  authDomain: "ins-clone-react.firebaseapp.com",
  projectId: "ins-clone-react",
  storageBucket: "ins-clone-react.appspot.com",
  messagingSenderId: "974097325781",
  appId: "1:974097325781:web:a37cecad8c3b31bee00c5c",
  measurementId: "G-BBSXCN712Q",
});

const db = firebaseConfig.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export {db, auth, storage};