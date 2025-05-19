"use client";

import { useSnackbar } from "notistack";

import Snack from "./Snack";

const SnackHOC = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return (
    <Snack enqueueSnackbar={enqueueSnackbar} closeSnackbar={closeSnackbar} />
  );
};

export default SnackHOC;
