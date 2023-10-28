import React from "react";
import { Table } from "@mantine/core";

const RatesTable = ({ ratesData }) => {
  const rows = ratesData?.map((element) => (
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
};

export default RatesTable;
