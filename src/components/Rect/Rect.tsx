import React, { useState } from "react";
import * as S from "./styles";

interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
}

function Rect(props: Props) {
  const [resizable, setResizable] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {};

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setResizable(true);
  };

  return (
    <S.RectBlock {...props} onClick={handleClick}>
      {resizable && (
        <S.Resizers>
          <S.Resizer className="top-left" onMouseDown={handleMouseDown} />
          <S.Resizer className="top-right" onMouseDown={handleMouseDown} />
          <S.Resizer className="bottom-right" onMouseDown={handleMouseDown} />
          <S.Resizer className="bottom-left" onMouseDown={handleMouseDown} />
        </S.Resizers>
      )}
    </S.RectBlock>
  );
}

export default Rect;
