import {useState, useEffect} from 'react'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Layout from './components/Layout'
import Channel from './components/Channel'
import Landing from './components/Landing'

import './styles/index.scss'

firebase.initializeApp({
  apiKey: "AIzaSyDhGQCAmHPJVDd3AdKbcyO50zVMOPB83hQ",
  authDomain: "realtime-chat-ea1bb.firebaseapp.com",
  projectId: "realtime-chat-ea1bb",
  storageBucket: "realtime-chat-ea1bb.appspot.com",
  messagingSenderId: "462175767664",
  appId: "1:462175767664:web:555172ecfd8fc8643538b5"
})


const auth = firebase.auth()
const db = firebase.firestore()

function App() {
  const [user, setUser] = useState(() => auth.currentUser)
  const [initialazing, setInitialazing] = useState(true)

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged(user => {
      if(user) {
        setUser(user)
      } else {
        setUser(null)
      }
      if(initialazing) setInitialazing(false)
    })
    
    
    return unsuscribe
  })
  
  const signIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    //Using the default device language
    firebase.auth().useDeviceLanguage();
    try {
      await auth.signInWithPopup(provider)
    } catch (e) {
      console.log(e);
    }
  }
  
  const signOut = async () => {
    try {
      await firebase.auth().signOut()
    } catch (e) {
      console.log(e.message);
    }
  }
  
  if(initialazing) return 'Loading...'

  return (
    <Layout user={user} signIn={signIn} signOut={signOut}>
      {user 
        ? 
          <>
            <Channel db={db} user={user} />
          </>
        :
          <Landing />
      }
    </Layout>
  );
}

export default App;
