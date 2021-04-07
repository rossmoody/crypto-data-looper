# The Crypto Looper

This is an abstracted database updater function for use on the [fomocryptocalculator.com](https://www.fomocryptocalculator.com) website. The CoinGecko rate limiting was causing problems so I made this function to grab missing closing prices for available cryptocurrencies and log them to a database.

It depends on Firebase private key environment variables inside `firebase-config.ts` so you won't be able to run it without generating your own.

## 🚀Setup locally

### 1. Install dependencies

```bash
npm i
```

### 2. Compile Typescript files

This will compile files to the `dist` folder and watch Typescript files for changes.

```bash
npm run compile
```

### 3. Run the compiled files

In a separate terminal window run the below command. This will watch for changes and rerun any functions in your terminal.

```bash
npm start
```
