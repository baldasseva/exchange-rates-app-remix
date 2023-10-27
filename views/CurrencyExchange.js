import React, {useEffect, useState} from 'react'
import {Select, NumberInput} from '@mantine/core'
import fetchData from "../utils/fetchData.js";


const CurrencyExchange = () => {
    const [from, setFrom] = useState([]);
    const [to, setTo] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(0)
    const [exchangeResult, setExchangeResult] = useState(0);

    const fetchCurrencies =  () =>
        fetchData(`https://api.apilayer.com/exchangerates_data/symbols`, 'GET')
            .then(response => response.text())
            .then(result => {
                const json = JSON.parse(result)
                return Object.keys(json.symbols)
            })

    const fetchLatest =  (base, symbol) =>
        fetchData(`https://api.apilayer.com/exchangerates_data/latest?base=${base}&symbols=${symbol}`, 'GET')
            .then(response => response.text())
            .then(result => JSON.parse(result))

    const calculateExchange = (fromBase, toSymbol) => {
        fetchLatest(fromBase,toSymbol).then((result)=>{
            const calculatedValue = 0 // TODO get exchange rate and calculate the value
            setExchangeResult(calculatedValue)
        })
    }


    useEffect(()=> {
        fetchCurrencies().then((result)=> {
            setCurrencies(result)
        })
    },[])


    return (<div style={{padding: '50px', margin: '50px', border: '1px solid black'}}>
        <h1>Currency Exchange</h1>
        <Select
            label="From"
            data={currencies}
            value={from}
            onChange={(value)=>{
                setFrom(value)
                fetchLatest(value).then((result) => calculateExchange(result, to))
            }}
        />
        <Select
            label="To"
            data={currencies}
            value={to}
            onChange={(value)=>{
                setTo(value)
                fetchLatest(value).then((result) => calculateExchange(from, result))
            }}
        />
        <NumberInput
        label="Input label"
        value={amount}
        onChange={(value)=> { setAmount(value)}}
    />
        <h1>{exchangeResult}</h1>
    </div>)
}

export default CurrencyExchange