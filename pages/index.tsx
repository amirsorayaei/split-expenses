import { ReactElement } from "react";
import { Typography } from "@mui/material";

import BaseLayout from "@/layouts/BaseLayout";

function Home() {
  return <Typography variant="h1">{"Hello"}</Typography>;
}

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
