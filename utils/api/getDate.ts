import fetchData from "../fetchData";

export default function getDate(
  date: string,
  base: string,
  symbol?: string,
): Promise<[string, number][]> {
  return fetchData(
    `https://api.apilayer.com/exchangerates_data/${date}?base=${base}${
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
