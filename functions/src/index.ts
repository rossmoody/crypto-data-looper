import * as functions from "firebase-functions"

import init from "../../src"
import sortDatabase from "../../src/sort-database"

export const updateDatabase = functions.https.onRequest((request, response) => {
  init().then(() => {
    console.log("Successfully updated database...")
    response.send(200)
  })
})

export const sortCoins = functions.https.onRequest((request, response) => {
  sortDatabase().then(() => {
    console.log("Database sorted...")
    response.send(200)
  })
})
