import firebase from "firebase-admin"
import config from "./config.json"

firebase.initializeApp({
  credential: firebase.credential.cert(config),
  databaseURL: "https://fomo-crypto-calculator-default-rtdb.firebaseio.com"
})

let database = firebase.database()

export default database
