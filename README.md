# Exchange rate app

This React app is build with [Remix](https://remix.run/). It is a server-side rendered application with three pages (+index landing page). The component library used is [Mantine](https://mantine.dev/). The project is written partially in TypeScript.

- **List of rates** contains a currency selector and a date picker. The table will display the currency exchange rates for the selected currency and date values
- **Compute currency exchange** contains two currency selectors (origin and target) and a number input (amount of origin money). The output will convert the inserted value to the target currency rate
- **Rates history** contains two currency selectors (origin and target) and a date range picker. The table will display the day by day variation of the exchange rate between the two currencies

## How to start

The application uses [Exchange rates Data API](https://apilayer.com/marketplace/exchangerates_data-api). Please insert your api key in the `utils/fetchApi.js` file.

You can start the application in evelopment mode with

```sh
yarn dev
```
