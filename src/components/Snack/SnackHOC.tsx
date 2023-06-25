import { ReactNode } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";
import { Grow } from "@mui/material";

import Snack from "./Snack";

// interface Props {
//   children: ReactNode | ReactNode[];
// }

const SnackHOC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Snack enqueueSnackbar={enqueueSnackbar} closeSnackbar={closeSnackbar} />
  );
};

export default SnackHOC;
