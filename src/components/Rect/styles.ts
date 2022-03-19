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
    border: 2px solid CornflowerBlue;
  }
`;
