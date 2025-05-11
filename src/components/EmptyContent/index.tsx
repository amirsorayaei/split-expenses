import React from "react";

interface Props {
  message: string;
}

const EmptyContent = ({ message }: Props) => {
  return (
    <div className="flex h-32 items-center justify-center">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};

export default EmptyContent;
