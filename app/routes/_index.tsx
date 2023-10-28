import type { MetaFunction } from "@remix-run/node";
import { Center } from "@mantine/core";
import Layout from "../../views/Layout";

export const meta: MetaFunction = () => {
  return [{ title: "Homepage" }];
};

export default function Index() {
  return (
    <Layout page="homepage">
      <Center>
        <h2>Welcome, please select a page from the header</h2>
      </Center>
    </Layout>
  );
}
