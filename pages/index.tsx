import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    if (router) router.replace("/groups");
  }, [router]);

  return null;
};

export default Home;
