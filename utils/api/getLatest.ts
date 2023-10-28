import fetchData from "../fetchData";

// {
//     "base": "USD",
//     "date": "2021-03-17",
//     "rates": {
//     "EUR": 0.813399,
//         "GBP": 0.72007,
//         "JPY": 107.346001
// },
//     "success": true,
//     "timestamp": 1519296206
// }

export default function getLatest(
  base: string,
  symbol?: string,
): Promise<[string, number][]> {
  return fetchData(
    `https://api.apilayer.com/exchangerates_data/latest?base=${base}${
      symbol ? `&symbols=${symbol}` : ""
    }`,
    "GET",
  )
    .then((response) => response.text())
    .then((result) => {
      const json = JSON.parse(result);
      return json.rates ? Object.entries(json.rates) : [];
    });
}
