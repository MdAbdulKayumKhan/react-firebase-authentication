import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.congif";

const initializetaionAuthentication = () =>{
    initializeApp(firebaseConfig);
}

export default initializetaionAuthentication;