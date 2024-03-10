// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase} from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
    apiKey: "AIzaSyAto-ueQM1VsvjhN3ZHofW6gKqekxq2VlA",
    authDomain: "chat-feb85.firebaseapp.com",
    projectId: "chat-feb85",
    storageBucket: "chat-feb85.appspot.com",
    messagingSenderId: "155434585128",
    appId: "1:155434585128:web:1d58f249ace45cccc5391d",
    measurementId: "G-ES2M9FW7XQ"
  };


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;