import React, { useEffect, useState } from "react";
import { Grid, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { format } from "date-fns";

import RatesTable from "../../components/RatesTable.js";
import Spinner from "../../components/Spinner.js";
import getSymbols from "../../utils/api/getSymbols.ts";
import getDate from "../../utils/api/getDate.ts";
import DATE_FORMAT from "../../utils/dateFormat.js";

const Rates = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState("EUR");
  const [date, setDate] = useState(new Date());
  const [rates, setRates] = useState([]);
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const refetchData = (date, currency) =>
    getDate(format(date, DATE_FORMAT), currency).then((result) => {
      setRates(result);
      setIsLoadingData(false);
    });

  useEffect(() => {
    setIsLoadingSymbols(true);
    setIsLoadingData(true);
    getSymbols().then((result) => {
      setCurrencies(result);
      setIsLoadingSymbols(false);
    });
    refetchData(date, currency);
  }, []);

  return isLoadingSymbols ? (
    <Spinner />
  ) : (
    <div>
      <Grid>
        <Grid.Col span={6}>
          <Select
            label="Currency"
            placeholder="Pick value"
            data={currencies}
            value={currency}
            onChange={(value) => {
              setCurrency(value);
              setIsLoadingData(true);
              refetchData(date, value);
            }}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <DatePickerInput
            label="Pick date"
            placeholder="Pick date"
            value={date}
            onChange={(value) => {
              setDate(value);
              setIsLoadingData(true);
              refetchData(value, currency);
            }}
          />
        </Grid.Col>
      </Grid>
      {isLoadingData ? <Spinner /> : <RatesTable ratesData={rates} />}
    </div>
  );
};

export default Rates;
