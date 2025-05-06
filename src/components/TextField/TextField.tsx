import React, { ChangeEvent, ReactNode } from "react";
import { Input } from "@/components/ui/input";

interface Props {
  id: string;
  handleSubmit?(): void;
  onChangeText(value: string): void;
  value?: string;
  placeholder?: string;
  type?: string;
  className?: string;
  endAdornment: ReactNode;
}

const TextField = ({
  id,
  handleSubmit,
  onChangeText,
  value,
  placeholder,
  type = "text",
  className,
  endAdornment,
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
    <div className="flex items-center gap-4">
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        className={className}
      />
      {endAdornment}
    </div>
  );
};

export default TextField;
