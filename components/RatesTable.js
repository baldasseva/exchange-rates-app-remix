import React from 'react'
import { Table } from '@mantine/core';

const RatesTable = ({ratesData}) => {
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

    const rows = ratesData?.rates && Object.entries(ratesData?.rates).map((element) => (
        <Table.Tr key={element[0]}>
            <Table.Td>{element[0]}</Table.Td>
            <Table.Td>{element[1]}</Table.Td>
        </Table.Tr>
    ));

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Currency</Table.Th>
                    <Table.Th>Exchange Rate</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
        </Table>
    );

}

export default RatesTable