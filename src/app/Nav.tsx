import { z } from "zod";

const MarketData = z.object({
  active_cryptocurrencies: z.number(),
  markets: z.number(),
  total_market_cap: z.object({
    usd: z.number(),
  }),
  market_cap_percentage: z.object({
    btc: z.number(),
    eth: z.number(),
  }),
  market_cap_change_percentage_24h_usd: z.number(),
});

async function getMarketData() {
  const data = await fetch("https://api.coingecko.com/api/v3/global", {
    next: { revalidate: 10 },
  }).then(async (res) => (await res.json()).data!);
  return MarketData.parse(data);
}

export default async function Nav() {
  const marketData = await getMarketData();

  return (
    <div className="w-full bg-slate-200 h-12 flex items-center px-10 text-xs">
      <div className="flex gap-4">
        <div>
          Coins:
          <span className="ml-1">{marketData.active_cryptocurrencies}</span>
        </div>
        <div>
          Exchanges:
          <span className="ml-1">{marketData.markets}</span>
        </div>
        <div>
          Market Cap:
          <span className="ml-1">{marketData.total_market_cap.usd}</span>
        </div>
        <div>
          <span>
            {marketData.market_cap_change_percentage_24h_usd.toFixed(2)}%
          </span>
        </div>
        <div>
          Dominance: <span>BTC {marketData.market_cap_percentage.btc}</span>{" "}
          <span>ETH: {marketData.market_cap_percentage.eth}</span>
        </div>
      </div>
    </div>
  );
}
