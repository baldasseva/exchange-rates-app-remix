import type { MetaFunction } from "@remix-run/node";
import Rates from "../../views/Rates"
import CurrencyExchange from "../../views/CurrencyExchange";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ]
}

export default function Index() {
  return (
      <>
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Rates/>
    </div>
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <CurrencyExchange/>
    </div>
      </>
  )
}
