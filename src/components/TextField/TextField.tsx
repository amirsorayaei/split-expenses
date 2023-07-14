import React, { ChangeEvent } from "react";
import { TextField as MaterialTextField, TextFieldProps } from "@mui/material";
import { NumericFormat, NumericFormatProps } from "react-number-format";

interface Props {
  handleSubmit?(): void;
  onChangeText(value: string): void;
}

const TextField = ({
  handleSubmit,
  onChangeText,
  ...props
}: Props & TextFieldProps) => {
  const onKeyDown = (e: any) => {
    // It triggers by pressing the enter key
    if (e.keyCode === 13) {
      handleSubmit?.();
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeText(event.target.value);
  };

  if (props.inputMode === "numeric") {
    return (
      <NumericFormat
        customInput={MaterialTextField as any}
        onKeyDown={onKeyDown}
        thousandSeparator={","}
        onValueChange={(values) => onChangeText(values.value)}
        {...(props as NumericFormatProps)}
      />
    );
  }

  return (
    <MaterialTextField onChange={onChange} onKeyDown={onKeyDown} {...props} />
  );
};

export default TextField;
