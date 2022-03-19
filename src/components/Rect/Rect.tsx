import React from "react";
import * as S from "./styles";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
}

function Rect({ x, y, width, height }: Props) {
  return <S.RectBlock x={x} y={y} width={width} height={height} />;
}

export default Rect;
