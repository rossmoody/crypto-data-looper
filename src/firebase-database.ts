import firebase from "firebase-admin"
import firebaseConfig from "./firebase-config"

firebase.initializeApp({
  credential: firebase.credential.cert(
    firebaseConfig as firebase.ServiceAccount
  ),
  databaseURL: "https://fomo-crypto-calculator-default-rtdb.firebaseio.com"
})

let database = firebase.database()

export default database
