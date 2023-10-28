import React, { useEffect, useState } from "react";
import { Select, Grid } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { format, sub } from "date-fns";

import HistoryRatesTable from "../../components/HistoryRatesTable.tsx";
import getSymbols from "../../utils/api/getSymbols.ts";
import getTimeseries from "../../utils/api/getTimeseries.ts";
import DATE_FORMAT from "../../utils/dateFormat.js";
import Spinner from "../../components/Spinner.js";

const History = () => {
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [fromTime, setFromTime] = useState(sub(new Date(), { months: 1 }));
  const [toTime, setToTime] = useState(new Date());
  const [currencies, setCurrencies] = useState([]);
  const [ratesData, setRatesData] = useState({});
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const refetchData = (fromTime, toTime, fromCur, toCur) =>
    getTimeseries(
      format(fromTime, DATE_FORMAT),
      format(toTime, DATE_FORMAT),
      fromCur,
      toCur,
    ).then((result) => {
      setRatesData(result);
      setIsLoadingData(false);
    });

  useEffect(() => {
    setIsLoadingSymbols(true);
    setIsLoadingData(true);
    getSymbols().then((result) => {
      setCurrencies(result);
      setIsLoadingSymbols(false);
    });
    refetchData(fromTime, toTime, fromCur, toCur);
  }, []);

  return isLoadingSymbols ? (
    <Spinner />
  ) : (
    <div>
      <Grid>
        <Grid.Col span={6}>
          <Select
            label="From"
            data={currencies}
            value={fromCur}
            onChange={(value) => {
              setFromCur(value);
              setIsLoadingData(true);
              refetchData(fromTime, toTime, value, toCur);
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Select
            label="To"
            data={currencies}
            value={toCur}
            onChange={(value) => {
              setToCur(value);
              setIsLoadingData(true);
              refetchData(fromTime, toTime, fromCur, value);
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}></Grid.Col>
      </Grid>
      <DatePickerInput
        label="Pick date range"
        type="range"
        value={[fromTime, toTime]}
        onChange={([newFrom, newTo]) => {
          setFromTime(newFrom);
          setToTime(newTo);
          if (newFrom && newTo) {
            setIsLoadingData(true);
            refetchData(newFrom, newTo, fromCur, toCur);
          }
        }}
      />
      {isLoadingData ? (
        <Spinner />
      ) : (
        <HistoryRatesTable targetCurrency={toCur} ratesData={ratesData} />
      )}
    </div>
  );
};

export default History;
