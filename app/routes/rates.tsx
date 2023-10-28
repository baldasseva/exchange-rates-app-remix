import type { MetaFunction } from "@remix-run/node";
import Rates from "../../views/Rates/Rates";
import Layout from "../../views/Layout";

export const meta: MetaFunction = () => {
  return [{ title: "Rates" }];
};

export default function RatesPage() {
  return (
    <Layout page="rates">
      <Rates />
    </Layout>
  );
}
