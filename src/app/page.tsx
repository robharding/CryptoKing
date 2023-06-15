async function pingApi() {
  const res = await fetch("https://api.coingecko.com/api/v3/ping");
  const data = res.json();
  return data;
}

export default async function Home() {
  const ping = await pingApi();
  console.log(ping);

  return <main className="">Hello World</main>;
}
