import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../modules";
import { focusRect } from "../../modules/rects";
import { RectType } from "../../types/rect";
import * as S from "./styles";
import { handleResize } from "./utils";

function Rect({ id, isFocused, x, y, width, height }: RectType) {
  const dispatch = useDispatch();
  const canvasCoordinate = useSelector(
    (state: RootState) => state.canvasCoordinate
  );

  const rectRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleResize(e, rectRef, canvasCoordinate);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(focusRect(id));
  };

  const [name, setName] = useState("이름을 입력");
  const [show, setShow] = useState(false);

  const handleDoubleClick = (e: React.MouseEvent) => {
    setShow(true);
  };

  return (
    <S.RectBlock
      x={x}
      y={y}
      width={width}
      height={height}
      onClick={handleClick}
      ref={rectRef}
      className="rect"
    >
      <div
        style={{ position: "absolute", top: -20 }}
        onDoubleClick={handleDoubleClick}
      >
        {show && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyUp={(e) => e.stopPropagation()}
            onBlur={() => setShow(false)}
          />
        )}
        {!show && <span>{name}</span>}
      </div>
      {isFocused && (
        <S.Resizers onMouseDown={handleMouseDown}>
          <S.Resizer className="top-left" />
          <S.Resizer className="top-right" />
          <S.Resizer className="bottom-right" />
          <S.Resizer className="bottom-left" />
        </S.Resizers>
      )}
    </S.RectBlock>
  );
}

export default Rect;
