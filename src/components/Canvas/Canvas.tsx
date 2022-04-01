import React, { useState, useRef, useEffect, useCallback } from "react";
import { v4 } from "uuid";

import Rect from "../Rect";
import * as S from "./styles";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setCoord } from "../../modules/canvasCoordinate";
import { createRect, focusOut, removeRect } from "../../modules/rects";

// types
import { RootState } from "../../modules";
import { RectType } from "../../types/rect";

const blankState = { x: 0, y: 0, width: 0, height: 0 };

function Canvas() {
  const { rects, canvasCoordinate } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const [rectGuide, setRectGuide] = useState(blankState);

  // refs
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  // canvas offset
  useEffect(() => {
    const setCanvasOffset = () => {
      const canvasOffset = canvasRef.current?.getBoundingClientRect();
      if (canvasOffset) {
        dispatch(setCoord(canvasOffset.top, canvasOffset.left));
      }
    };

    document.addEventListener("resize", setCanvasOffset);
    setCanvasOffset();
  }, [dispatch]);

  // draw Rect
  const handleMouseDown = (e: React.MouseEvent) => {
    // 캔버스 클릭시 사각형 포커스 해제
    if (e.target === e.currentTarget) {
      dispatch(focusOut());
    }

    const $canvas = canvasRef.current;
    const startX = e.clientX - canvasCoordinate.left;
    const startY = e.clientY - canvasCoordinate.top;
    isDrawing.current = true;
    setRectGuide({ x: startX, y: startY, width: 0, height: 0 });

    const drawRect = (e: MouseEvent) => {
      const mouseX = e.clientX - canvasCoordinate.left;
      const mouseY = e.clientY - canvasCoordinate.top;
      const width = mouseX - startX;
      const height = mouseY - startY;
      setRectGuide({ x: startX, y: startY, width: width, height: height });
    };
    const stopDrawRect = (e: MouseEvent) => {
      const mouseX = e.clientX - canvasCoordinate.left;
      const mouseY = e.clientY - canvasCoordinate.top;
      const width = mouseX - startX;
      const height = mouseY - startY;

      // minimum 10 x 10
      if (width >= 10 && height >= 10) {
        const newRect: RectType = {
          id: v4(),
          isFocused: true,
          x: startX,
          y: startY,
          width: width,
          height: height,
        };

        dispatch(createRect(newRect));
      }

      setRectGuide(blankState);
      $canvas?.removeEventListener("mousemove", drawRect);
      $canvas?.removeEventListener("mouseup", stopDrawRect);
    };

    $canvas?.addEventListener("mousemove", drawRect);
    $canvas?.addEventListener("mouseup", stopDrawRect);
  };

  // remove rect
  const remove = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Backspace") {
        const focused = rects.find((rect) => rect.isFocused === true);
        console.log(focused);
        if (focused) dispatch(removeRect(focused.id));
      }
    },
    [dispatch, rects]
  );

  useEffect(() => {
    document.addEventListener("keyup", remove);
    return () => document.removeEventListener("keyup", remove);
  }, [remove]);

  return (
    <S.Canvas ref={canvasRef} onMouseDown={handleMouseDown}>
      {rectGuide !== blankState && (
        <S.RectGuide
          style={{
            left: rectGuide.x,
            top: rectGuide.y,
            width: rectGuide.width,
            height: rectGuide.height,
          }}
        />
      )}
      {rects.map((rect) => (
        <Rect key={rect.id} {...rect} />
      ))}
    </S.Canvas>
  );
}

export default Canvas;
