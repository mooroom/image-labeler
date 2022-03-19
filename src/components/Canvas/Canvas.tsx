import React, { useState, useRef, useEffect } from "react";
import Rect from "../Rect";
import * as S from "./styles";

type RectType = {
  x: number;
  y: number;
  width: number;
  height: number;
};

const blankState = { x: 0, y: 0, width: 0, height: 0 };

function Canvas() {
  const [rectGuide, setRectGuide] = useState<RectType>(blankState);
  const [rects, setRects] = useState<RectType[]>([]);
  const [clientCoordinate, setClientCoordinate] = useState({ top: 0, left: 0 });

  // refs
  const canvasRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);

  // canvas offset
  useEffect(() => {
    const setCanvasOffset = () => {
      const canvasOffset = canvasRef.current?.getBoundingClientRect();
      if (canvasOffset) {
        console.log(canvasOffset.left);
        setClientCoordinate({ top: canvasOffset.top, left: canvasOffset.left });
      }
    };

    window.addEventListener("resize", setCanvasOffset);

    setCanvasOffset();
  }, []);

  // draw Rect
  const handleMouseDown = (e: React.MouseEvent) => {
    const $canvas = canvasRef.current;
    const startX = e.clientX - clientCoordinate.left;
    const startY = e.clientY - clientCoordinate.top;
    isDrawing.current = true;
    setRectGuide({ x: startX, y: startY, width: 0, height: 0 });

    const drawRect = (e: MouseEvent) => {
      const mouseX = e.clientX - clientCoordinate.left;
      const mouseY = e.clientY - clientCoordinate.top;
      const width = mouseX - startX;
      const height = mouseY - startY;
      setRectGuide({ x: startX, y: startY, width: width, height: height });
    };
    const stopDrawRect = (e: MouseEvent) => {
      const mouseX = e.clientX - clientCoordinate.left;
      const mouseY = e.clientY - clientCoordinate.top;
      const width = mouseX - startX;
      const height = mouseY - startY;

      const newRect = {
        x: startX,
        y: startY,
        width: width,
        height: height,
      };

      setRects([...rects, newRect]);
      setRectGuide(blankState);
      $canvas?.removeEventListener("mousemove", drawRect);
      $canvas?.removeEventListener("mouseup", stopDrawRect);
    };

    $canvas?.addEventListener("mousemove", drawRect);
    $canvas?.addEventListener("mouseup", stopDrawRect);
  };

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
        <Rect {...rect} />
      ))}
    </S.Canvas>
  );
}

export default Canvas;
