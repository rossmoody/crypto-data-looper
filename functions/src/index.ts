import * as functions from "firebase-functions"
import init from "../../src"

export const updateDatabase = functions.https.onRequest((request, response) => {
  init().then(() => {
    response.send(200)
  })
})
