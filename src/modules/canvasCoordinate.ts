const SET_COORD = "SET_COORD" as const;

export const setCoord = (top: number, left: number) => ({
  type: SET_COORD,
  payload: { top, left },
});

type CanvasCoordAction = ReturnType<typeof setCoord>;

export type CanvasCoordState = {
  top: number;
  left: number;
};

const initialState: CanvasCoordState = {
  top: 0,
  left: 0,
};

function canvasCoordinate(
  state: CanvasCoordState = initialState,
  action: CanvasCoordAction
): CanvasCoordState {
  switch (action.type) {
    case SET_COORD:
      return { top: action.payload.top, left: action.payload.left };
    default:
      return state;
  }
}

export default canvasCoordinate;
