import fetchData from "../fetchData";
import type {TimeseriesRates} from "../types/timeseriesRates";

// {
//     "base": "EUR",
//     "end_date": "2012-05-03",
//     "rates": {
//     "2012-05-01": {
//         "AUD": 1.278047,
//         "CAD": 1.302303,
//         "USD": 1.322891
//         },
//     "2012-05-02": {
//         "AUD": 1.274202,
//         "CAD": 1.299083,
//         "USD": 1.315066
//         },
//     },
//     "start_date": "2012-05-01",
//     "success": true,
//     "timeseries": true
// }

export default function getTimeseries(
    startDate: string,
    endDate: string,
    base?: string,
    symbol?: string,
): Promise<TimeseriesRates> {
    return fetchData(
        `https://api.apilayer.com/exchangerates_data/timeseries?start_date=${startDate}&end_date=${endDate}${
            symbol ? `&symbols=${symbol}`:""}${base ? `&base=${base}`:""}`,
        "GET",
    )
        .then((response) => response.text())
        .then((result) => {
            const json = JSON.parse(result);
            return json.rates || {};
        });
}
