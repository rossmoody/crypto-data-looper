import database from "./firebase-database"

interface Coin {
  [date: string]: number
}

/**
 * Helper function for getting and testing database data
 */
async function sortDatabase() {
  const root = database.ref("coins")

  const coinIDList: string[] = Object.keys((await root.once("value")).val())

  for (const coinID of coinIDList) {
    const childCoinRef = root.child(coinID)

    childCoinRef.once("value", snapshot => {
      let data: Coin = snapshot.val()
      console.log(data)
    })
  }
}

export default sortDatabase
