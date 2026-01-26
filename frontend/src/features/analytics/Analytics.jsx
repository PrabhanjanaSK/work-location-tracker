import { useLoaderData } from "react-router-dom";

export default function Analytics() {
  const data = useLoaderData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
