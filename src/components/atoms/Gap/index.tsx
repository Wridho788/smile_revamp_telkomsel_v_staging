import { FC } from "react";

interface Props {
  width: number;
  height: number;
}

const Gap: FC<Props> = ({ width, height }: Props) => {
  return <div style={{ width: `${width}px`, height: `${height}px` }}></div>;
};

export default Gap;
