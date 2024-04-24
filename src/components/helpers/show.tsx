import { Children } from "react";

export const Show = (props: any) => {
  let when: any = null;
  let otherwise: any = null;

  Children.forEach(props.children, (children) => {
    if (children.props.isTrue === undefined) {
      otherwise = children;
    } else if (!when && children.props.isTrue === true) {
      when = children;
    }
  });

  return when || otherwise;
};

Show.When = ({ isTrue, children }: { isTrue: any; children: any }) =>
  isTrue && children;
Show.Else = ({ render, children }: { render?: any; children: any }) =>
  render || children;
