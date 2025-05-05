import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  handleSubmit?(): void;
  onChangeText(value: string): void;
  value?: string;
  placeholder?: string;
  type?: string;
  className?: string;
}

const TextField = ({
  handleSubmit,
  onChangeText,
  value,
  placeholder,
  type = "text",
  className,
}: Props) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChangeText(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && handleSubmit) {
      handleSubmit();
    }
  };

  return (
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      className={className}
    />
  );
};

export default TextField;
