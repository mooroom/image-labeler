import { RectType } from "../types/rect";

export const CREATE_RECT = "CREATE_RECT" as const;

export const createRect = (newRect: RectType) => ({
  type: CREATE_RECT,
  newRect,
});

type RectsAction = ReturnType<typeof createRect>;

type RectsState = RectType[];

const initialState: RectsState = [];

function rects(
  state: RectsState = initialState,
  action: RectsAction
): RectsState {
  switch (action.type) {
    case CREATE_RECT:
      return [...state, action.newRect];
    default:
      return state;
  }
}

export default rects;
