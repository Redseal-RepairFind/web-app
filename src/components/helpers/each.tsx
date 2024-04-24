import { EachProps } from "@/interfaces";

const Each = ({ render, of }: EachProps) => (
  <>{of.map((item: any, index: number) => render(item, index))}</>
);

export default Each;
