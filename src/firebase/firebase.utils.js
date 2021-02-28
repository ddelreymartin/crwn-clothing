import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDPZdzVuNO_LA_EwZPJFeWjB5jqEoSfBEA",
  authDomain: "crwn-db-c03a2.firebaseapp.com",
  projectId: "crwn-db-c03a2",
  storageBucket: "crwn-db-c03a2.appspot.com",
  messagingSenderId: "265555741598",
  appId: "1:265555741598:web:c4954ff1860dbf3e99a48f",
  measurementId: "G-DDWZ572C77"
};

export const createUserProfileDocument = async (userAuth, additionData) => {
  if(!userAuth){
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionData
      })
    }catch(error){
      console.error('An error happend here', error.message);
    }
  }

  return userRef;
  console.log(snapShot);
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;