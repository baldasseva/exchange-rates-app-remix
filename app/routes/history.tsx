import type { MetaFunction } from "@remix-run/node";
import History from "../../views/History/History";
import Layout from "../../views/Layout";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function HistoryPage() {
  return (
    <Layout page="history">
      <History />
    </Layout>
  );
}
