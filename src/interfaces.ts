import { ReactNode } from "react";

export interface ContainerProps {
  children?: React.ReactNode;
  className?: string;
}

export interface LayoutProps {
  children?: React.ReactNode;
  className?: any;
  hasBackground?: boolean;
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

export interface LanguageItemProp {
  id: number;
  name: string;
  image_href: string;
  slug: string;
}

export interface LanguageMap {
  en: string;
  fr: string;
  pa: string;
  zh: string;
  es: string;
}
