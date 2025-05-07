import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, onChange, value, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (type === "number" && onChange) {
        const rawValue = e.target.value.replace(/,/g, "");
        // Create a new event with the raw value for calculations
        const newEvent = {
          ...e,
          target: {
            ...e.target,
            value: rawValue,
          },
        };
        // Update the display value with formatting
        e.target.value = rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // Pass the raw value through onChange
        onChange(newEvent);
      } else if (onChange) {
        // Pass through the event for other input types
        onChange(e);
      }
    };

    // Format the display value if it's a number type
    const displayValue =
      type === "number" && value
        ? String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        : value;

    return (
      <input
        type={type === "number" ? "text" : type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        onChange={handleChange}
        value={displayValue}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
