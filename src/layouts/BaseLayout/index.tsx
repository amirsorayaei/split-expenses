import { FC, ReactNode } from "react";
import PropTypes from "prop-types";

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div
    // sx={{
    //   display: 'flex',
    //   flex: 1,
    //   height: '100%'
    // }}
    >
      {children}
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node,
};

export default BaseLayout;
