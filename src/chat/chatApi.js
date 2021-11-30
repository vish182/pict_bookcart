import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import { Search } from '../core/Search';

const firebaseConfig = {
    apiKey: "AIzaSyCHNG_ZF6mI83giqDTHh-r5ZgHa3Aes8Y0",
    authDomain: "bookcart-v1.firebaseapp.com",
    projectId: "bookcart-v1",
    storageBucket: "bookcart-v1.appspot.com",
    messagingSenderId: "232495208641",
    appId: "1:232495208641:web:7fa79300026e6247d79c40",
    measurementId: "G-JZ2727MP84"
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);

// const auth = firebase.auth();
export const firestoreInstance = firebaseApp.firestore();

export const compareUserEmail = ({u1, u2}) => {
    let users = {user1: "", user2: ""};
    if(u1 > u2){
        users.user1 = u1;
        users.user2 = u2;
    } else{
        users.user1 = u2;
        users.user2 = u1;
    }
    console.log("usrs: ", users.user1+users.user2);
    return users;
}

export const createConvo = ({sellerEmail, userEmail}) => {
    console.log(sellerEmail, " - ", userEmail);
    let users = compareUserEmail({u1: sellerEmail, u2: userEmail});
    const UID = users.user1+users.user2;
    
    return new Promise((resolve, reject) => {
      firestoreInstance
      .collection("conversations")
      .doc(UID)
      .set({
        convoid: UID,
        user1: users.user1,
        user2: users.user2 
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef);
        resolve({convId: UID});
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        reject(error);
      });
    });
  };

  export const createMessage = ({convoId, user, msg}) => {

    return new Promise((resolve, reject) => {
      if(msg == ""){
        resolve();
      }
  
      firestoreInstance
        .collection("messages")
        .doc()
        .set({
          convoid: convoId,
          sender: user._id,
          text: msg,
          createdAt:  new Date().toISOString().replace(/T/,'').replace(/\..+/, '')
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef);
          resolve();
         
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          reject();
        
        });
    });

    
  }

  const getIntTime = () => {
    const date = new Date().toLocaleString();
    
  };

  //////////////////

