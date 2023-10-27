import React, {useEffect, useState} from 'react'
import {Select} from '@mantine/core'
import RatesTable from "../components/RatesTable.js";
import fetchData from "../utils/fetchData.js";


const Rates = () => {
    const [currencies, setCurrencies] = useState([]);
    const [currency, setCurrency] = useState('EUR');
    const [rates, setRates] = useState({});

    const fetchCurrencies =  () =>
        fetchData(`https://api.apilayer.com/exchangerates_data/symbols`, 'GET')
            .then(response => response.text())
            .then(result => {
                const json = JSON.parse(result)
                return Object.keys(json.symbols)
            })

    const fetchLatest =  (value) =>
        fetchData(`https://api.apilayer.com/exchangerates_data/latest?base=${value}`, 'GET')
            .then(response => response.text())
            .then(result => JSON.parse(result))

    useEffect(()=> {
        fetchCurrencies().then((result)=> setCurrencies(result))
        fetchLatest(currency).then((result) => setRates(result))
    },[])


    return (<div style={{padding: '50px', margin: '50px', border: '1px solid black'}}>
        <h1>Rates</h1>
        <Select
            label="Currency"
            placeholder="Pick value"
            data={currencies}
            value={currency}
            onChange={(value)=>{
                setCurrency(value)
                fetchLatest(value).then((result) => setRates(result))
            }}
        />
        <RatesTable ratesData={rates}/>
    </div>)
}

export default Rates