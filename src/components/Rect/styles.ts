import styled, { css } from "styled-components";
type size = { x: number; y: number; width: number; height: number };

export const RectBlock = styled.div<size>`
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  ${({ x, y, width, height }) => css`
    left: ${x}px;
    top: ${y}px;
    width: ${width}px;
    height: ${height}px;
  `}

  &:hover {
    /* border: 1px solid CornflowerBlue; */
    outline: 1px solid cornflowerblue;
  }
`;

export const Resizers = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid cornflowerblue;
  position: relative;
`;

export const Resizer = styled.div`
  width: 8px;
  height: 8px;
  background: white;
  border: 1px solid cornflowerblue;
  position: absolute;

  &.top-left {
    top: -4px;
    left: -4px;
    cursor: nw-resize;
  }

  &.top-right {
    top: -4px;
    right: -4px;
    cursor: ne-resize;
  }

  &.bottom-right {
    bottom: -4px;
    right: -4px;
    cursor: se-resize;
  }

  &.bottom-left {
    bottom: -4px;
    left: -4px;
    cursor: sw-resize;
  }
`;
