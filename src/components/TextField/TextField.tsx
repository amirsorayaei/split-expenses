import React from "react";
import { TextField as MaterialTextField, TextFieldProps } from "@mui/material";
import { NumericFormat } from "react-number-format";

interface Props {
  handleSubmit?(): void;
}

const TextField = ({ handleSubmit, ...props }: Props & TextFieldProps) => {
  const onKeyDown = (e: any) => {
    // It triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit?.();
    }
  };

  if (props.inputMode === "numeric") {
    return (
      <NumericFormat
        {...props}
        customInput={MaterialTextField}
        onKeyDown={onKeyDown}
        thousandSeparator={","}
      />
    );
  }

  return <MaterialTextField {...props} onKeyDown={onKeyDown} />;
};

export default TextField;
