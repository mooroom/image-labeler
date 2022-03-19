import styled from "styled-components";

export const Canvas = styled.div`
  width: 600px;
  height: 600px;
  background: white;
  position: relative;
`;

export const RectGuide = styled.div`
  border: 2px solid black;
  opacity: 0.3;
  position: absolute;
  cursor: crosshair;
`;
