import type { MetaFunction } from "@remix-run/node";
import CurrencyExchange from "../../views/CurrencyExchange/CurrencyExchange";
import Layout from "../../views/Layout";

export const meta: MetaFunction = () => {
  return [{ title: "Currency Exchange" }];
};

export default function ExchangePage() {
  return (
    <Layout page="exchange">
      <CurrencyExchange />
    </Layout>
  );
}
