import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();

  console.error("Route error:", error);

  return (
    <div style={{ padding: 20 }}>
      <h2>Something went wrong</h2>
      <pre>
        {error?.status || "Error"} {error?.statusText || error?.message}
      </pre>
    </div>
  );
}

export default ErrorPage;
