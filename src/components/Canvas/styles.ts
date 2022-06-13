import styled from "styled-components";
import sampleImg from "../../img/sample.jpeg";

export const Canvas = styled.div`
  width: 600px;
  height: 600px;
  background: white;
  position: relative;
  background-image: url(${sampleImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const RectGuide = styled.div`
  border: 2px solid black;
  opacity: 0.3;
  position: absolute;
  cursor: crosshair;
`;

export const RectLayer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
