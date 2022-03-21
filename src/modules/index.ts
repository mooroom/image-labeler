import { combineReducers } from "redux";
import canvasCoordinate from "./canvasCoordinate";
import rects from "./rects";

const rootReducer = combineReducers({ canvasCoordinate, rects });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
