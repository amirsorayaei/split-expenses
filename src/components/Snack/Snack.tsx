import { Component } from "react";
import { OptionsObject, SnackbarKey, SnackbarMessage } from "notistack";
import { Button } from "@mui/material";

interface Props {
  enqueueSnackbar(
    message: SnackbarMessage,
    options?: OptionsObject
  ): SnackbarKey;
  closeSnackbar(key?: SnackbarKey): void;
}

class Snack extends Component<Props> {
  static myComponentInstance: { props: Props };

  static error(message: SnackbarMessage, options?: OptionsObject) {
    const { enqueueSnackbar, closeSnackbar } = Snack.myComponentInstance.props;
    enqueueSnackbar(message, {
      variant: "error",
      ...options,
    });
  }

  static info(message: SnackbarMessage, options?: OptionsObject) {
    const { enqueueSnackbar, closeSnackbar } = Snack.myComponentInstance.props;
    enqueueSnackbar(message, {
      variant: "info",
      ...options,
    });
  }

  static warn(message: SnackbarMessage, options?: OptionsObject) {
    const { enqueueSnackbar, closeSnackbar } = Snack.myComponentInstance.props;
    enqueueSnackbar(message, {
      variant: "warning",
      ...options,
    });
  }

  static success(message: SnackbarMessage, options?: OptionsObject) {
    const { enqueueSnackbar, closeSnackbar } = Snack.myComponentInstance.props;
    enqueueSnackbar(message, {
      variant: "success",
      ...options,
    });
  }

  constructor(props: any) {
    super(props);

    Snack.myComponentInstance = this;
  }

  render() {
    return null;
  }
}

export default Snack;
