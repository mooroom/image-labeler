import { RectType } from "../types/rect";

export const CREATE_RECT = "CREATE_RECT" as const;
export const FOCUS_RECT = "FOCUS_RECT" as const;

export const createRect = (newRect: RectType) => ({
  type: CREATE_RECT,
  newRect,
});

export const focusRect = (id: string) => ({
  type: FOCUS_RECT,
  id,
});

type RectsAction = ReturnType<typeof createRect> | ReturnType<typeof focusRect>;

type RectsState = RectType[];

const initialState: RectsState = [];

function rects(
  state: RectsState = initialState,
  action: RectsAction
): RectsState {
  switch (action.type) {
    case CREATE_RECT:
      return [...state, action.newRect].map((rect) =>
        rect.id !== action.newRect.id
          ? { ...rect, isFocused: false }
          : action.newRect
      );
    case FOCUS_RECT:
      return state.map((rect) =>
        rect.id === action.id
          ? { ...rect, isFocused: true }
          : { ...rect, isFocused: false }
      );
    default:
      return state;
  }
}

export default rects;
