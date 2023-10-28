import React from "react";
import { Table } from "@mantine/core";
import type { TimeseriesRates } from "../utils/types/timeseriesRates";

type Props = {
  ratesData?: TimeseriesRates;
  targetCurrency: string;
};

const HistoryRatesTable = ({ ratesData, targetCurrency }: Props) => {
  const rows =
    ratesData &&
    Object.entries(ratesData).map((element) => (
      <Table.Tr key={element[0]}>
        <Table.Td>{element[0]}</Table.Td>
        <Table.Td>{element[1][targetCurrency]}</Table.Td>
      </Table.Tr>
    ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Date</Table.Th>
          <Table.Th>Exchange Rate</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default HistoryRatesTable;
