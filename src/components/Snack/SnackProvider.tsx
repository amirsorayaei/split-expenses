import React from "react";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { Button, Grow } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

const SnackProvider = ({ children }: Props) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      preventDuplicate
      hideIconVariant
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      TransitionComponent={Grow}
      action={
        <Button
          color={"primary"}
          variant={"text"}
          size={"small"}
          onClick={() => closeSnackbar()}
          sx={{ minWidth: "auto" }}
        >
          <CloseIcon color={"action"} />
        </Button>
      }
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackProvider;
