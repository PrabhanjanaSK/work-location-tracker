import { useLoaderData } from "react-router-dom";

function Profile() {
  const data = useLoaderData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default Profile;
