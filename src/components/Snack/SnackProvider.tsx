import React from "react";
import { SnackbarProvider, closeSnackbar } from "notistack";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
      action={
        <Button
          variant="ghost"
          size="icon"
          onClick={() => closeSnackbar()}
          className="h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
      }
    >
      {children}
    </SnackbarProvider>
  );
};

export default SnackProvider;
