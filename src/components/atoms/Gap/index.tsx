import React from "react";

interface IProps {
  width: number;
  height: number;
}
const Index = (props: IProps) => {
  return <div style={{ width: props.width, height: props.height }}></div>;
};

export default Index;
