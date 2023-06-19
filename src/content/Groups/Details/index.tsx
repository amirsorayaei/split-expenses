import { Container } from "@mui/material";
import { useRouter } from "next/router";

import PageTitle from "@/components/PageTitle";
import Expenses from "./Expenses";

interface Props {
  id: number;
}

const GroupDetails = ({ id }: Props) => {
  const router = useRouter();

  const onClickCreatNewExpense = () => {
    router.push(`/groups/${id}/create-expense`);
  };

  return (
    <Container maxWidth="lg">
      <PageTitle
        heading="Group Details"
        subHeading="See group details below and create new expenses."
        buttonTitle={"Create new expense"}
        onClickButton={onClickCreatNewExpense}
      />
      <Expenses />
    </Container>
  );
};

export default GroupDetails;
