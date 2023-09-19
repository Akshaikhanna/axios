import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBeeFQYrzPTN-Nhy6B-qJ3oFxq2mWeRns0",
  authDomain: "react-auth-8b52a.firebaseapp.com",
  projectId: "react-auth-8b52a",
  storageBucket: "react-auth-8b52a.appspot.com",
  messagingSenderId: "1076512610111",
  appId: "1:1076512610111:web:f351cd602f8e94c7ca258a",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export default app;
