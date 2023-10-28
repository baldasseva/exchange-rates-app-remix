import fetchData from "../fetchData";

export default function getSymbols(): Promise<string[]> {
  return fetchData(`https://api.apilayer.com/exchangerates_data/symbols`, "GET")
    .then((response) => response.text())
    .then((result) => {
      const json = JSON.parse(result);
      return Object.keys(json.symbols);
    });
}
