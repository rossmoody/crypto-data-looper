import * as functions from "firebase-functions"
import init from "../../src"
import sortDatabase from "../../src/sort-database"

export const updateDatabase = functions.https.onRequest((request, response) => {
  init().then(() => {
    sortDatabase().then(() => {
      console.log("Database sorted...")
      response.send(200)
    })
  })
})
