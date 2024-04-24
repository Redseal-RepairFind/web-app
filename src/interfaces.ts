import { ReactNode } from "react";

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export interface LayoutProps {
  children?: React.ReactNode;
}

export interface EachProps {
  render: (item: any, index: number) => ReactNode;
  of: any[];
}

export interface FooterLinkProp {
  id: number;
  title: string;
  path: string;
}
