import { ReactElement } from "react";
import BaseLayout from "@/layouts/BaseLayout";

function Home() {
  return null;
}

export default Home;

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
