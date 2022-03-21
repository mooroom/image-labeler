import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { focusRect } from "../../modules/rects";
import { RectType } from "../../types/rect";
import * as S from "./styles";

function Rect({ id, isFocused, x, y, width, height }: RectType) {
  const dispatch = useDispatch();
  const [resizable, setResizable] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(focusRect(id));
    setResizable(true);
  };

  return (
    <S.RectBlock
      x={x}
      y={y}
      width={width}
      height={height}
      onClick={handleClick}
    >
      {isFocused && (
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
