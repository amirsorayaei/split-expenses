import React from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Scrollbar = ({ children, className }: Props) => {
  return (
    <Scrollbars
      autoHide
      renderThumbVertical={({ style, ...props }) => (
        <div
          {...props}
          style={{
            ...style,
            backgroundColor: "hsl(var(--muted-foreground))",
            borderRadius: "4px",
          }}
        />
      )}
      className={className}
    >
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
