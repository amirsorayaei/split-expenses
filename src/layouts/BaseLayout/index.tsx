import { FC, ReactNode } from "react";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return <div className="min-h-screen bg-background">{children}</div>;
};

export default BaseLayout;
