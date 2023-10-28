import React, { useEffect, useState } from "react";
import { Select, NumberInput, Grid, Text } from "@mantine/core";
import getSymbols from "../../utils/api/getSymbols.ts";
import getLatest from "../../utils/api/getLatest.ts";
import Spinner from "../../components/Spinner.js";

const CurrencyExchange = () => {
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [exchangeResult, setExchangeResult] = useState(0);
  const [isLoadingSymbols, setIsLoadingSymbols] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);

  const fetchAndCalculate = (fromBase, toSymbol) =>
    getLatest(fromBase, toSymbol).then((result) => {
      const newRate = result[0][1];
      setExchangeRate(newRate);
      setExchangeResult(amount * newRate);
      setIsLoadingData(false);
    });

  useEffect(() => {
    setIsLoadingSymbols(true);
    setIsLoadingData(true);
    getSymbols().then((result) => {
      setCurrencies(result);
      setIsLoadingSymbols(false);
    });
    fetchAndCalculate(from, to);
  }, []);

  return isLoadingSymbols ? (
    <Spinner />
  ) : (
    <div>
      <Grid>
        <Grid.Col span={4}>
          <Select
            label="From"
            data={currencies}
            value={from}
            onChange={(value) => {
              setFrom(value);
              setIsLoadingData(true);
              fetchAndCalculate(value, to);
            }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <Select
            label="To"
            data={currencies}
            value={to}
            onChange={(value) => {
              setTo(value);
              setIsLoadingData(true);
              fetchAndCalculate(from, value);
            }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <NumberInput
            label="Amount"
            value={amount}
            onChange={(newAmount) => {
              setAmount(newAmount);
              setExchangeResult(newAmount * exchangeRate);
            }}
          />
        </Grid.Col>

        {isLoadingData ? (
          <Spinner />
        ) : (
          <>
            <Grid.Col span={6}>
              <Text fw={500}>Exchange Rate</Text>
              <h1>{exchangeRate}</h1>
            </Grid.Col>

            <Grid.Col span={6}>
              <Text fw={500}>Exchange Result</Text>
              <h1>{exchangeResult}</h1>
            </Grid.Col>
          </>
        )}
      </Grid>
    </div>
  );
};

export default CurrencyExchange;
