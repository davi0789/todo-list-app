// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBLPgx-PzvOf14Gz1s5QPcmDlaR09tPoQU",
  authDomain: "todo-list-55eb5.firebaseapp.com",
  databaseURL: "https://todo-list-55eb5-default-rtdb.firebaseio.com",
  projectId: "todo-list-55eb5",
  storageBucket: "todo-list-55eb5.firebasestorage.app",
  messagingSenderId: "1026074043091",
  appId: "1:1026074043091:web:7c948c4561d98b1e766a26",
  measurementId: "G-5SE44TX88M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };