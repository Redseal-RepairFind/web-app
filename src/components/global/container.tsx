import React from "react";

interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={`${className} w-full max-w-7xl border border-red-500 mx-auto px-4`}
    >
      {children}
    </div>
  );
}

export default Container;
