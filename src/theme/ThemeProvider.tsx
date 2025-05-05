import React, { createContext } from "react";

export const ThemeContext = createContext((_themeName: string): void => {});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-h-screen bg-background">{children}</div>;
};

export default ThemeProvider;
