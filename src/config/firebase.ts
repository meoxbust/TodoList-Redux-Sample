// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDO_93ZehuYcdxchH0_jVJ-wCv8u6xbnrQ",
  authDomain: "todo-list-firebase-6c706.firebaseapp.com",
  projectId: "todo-list-firebase-6c706",
  storageBucket: "todo-list-firebase-6c706.appspot.com",
  messagingSenderId: "174774425753",
  appId: "1:174774425753:web:9b88f3ce022a7ecb97c008",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
