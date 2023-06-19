import { Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/groups");
  }, []);

  return null;
};

export default Home;
