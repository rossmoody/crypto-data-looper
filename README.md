# The Crypto Looper

This is a cryptocurrency database function for use on the [fomocryptocalculator.com](https://www.fomocryptocalculator.com) website. The CoinGecko rate limiting was causing problems so I made this function to grab all closing prices for all available cryptocurrencies since the creation of Bitcoin and log them to a Firebase database.

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

First you will need to invoke the function in `index.ts` with `init()`.

In a separate terminal window run the below command. This will watch for changes and rerun any functions in your terminal coming from the `index.ts` file.

```bash
npm run index
```

#### Sorting function

To run the sorting function locally you will need to invoke it in the `sort-database.ts` file and run the below command.

```bash
npm run sort
```

## Firebase Functions

There is a config file you will need to add that oulines `projectId`, `privateKey` and `clientEmail`. This is not tracked as the keys are private.

To deploy the function run:

```bash
firebase deploy
```
