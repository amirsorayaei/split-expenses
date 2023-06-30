import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { Container } from "@mui/material";

import PageTitle from "@/components/PageTitle";
import { RootState } from "@/redux/store";
import EmptyContent from "@/components/EmptyContent";
import Expenses from "@/content/Expenses";

interface Props {
  id: number;
}

const GroupDetails = ({ id }: Props) => {
  const router = useRouter();

  const group = useSelector((state: RootState) =>
    state.group.groups.find((item) => item.id === id)
  );

  const onClickCreatNewExpense = () => {
    router.push(`/groups/${id}/create-expense`);
  };

  if (!group) {
    return <EmptyContent message={"No group found!"} />;
  }

  return (
    <Container maxWidth="lg">
      <PageTitle
        heading={`Group Details - ${group?.name}`}
        subHeading={"See group details below and create new expenses."}
        buttonTitle={"Create new expense"}
        onClickButton={onClickCreatNewExpense}
      />
      <Expenses group={group} />
    </Container>
  );
};

export default GroupDetails;
