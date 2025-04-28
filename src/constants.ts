export const TILE_SIZE = 32;
export const TOTAL_ROWS = 29;
export const TOTAL_COLS = 26;

export const GAME_WIDTH = TILE_SIZE * TOTAL_COLS;
export const GAME_HEIGHT = TILE_SIZE * TOTAL_ROWS;

export const DEFAULT_X_POS = 250;
export const DEFAULT_Y_POS = 260;

export const PLAYER_MOVE_SPEED = 0.2;

export const CAMERA_ZOOM = 1.2;

export enum DirectionEnum {
  UP = "UP",
  LEFT = "LEFT",
  DOWN = "DOWN",
  RIGHT = "RIGHT",
}

export enum ScenesEnum {
  MAIN_MENU = "MAIN_MENU",
  GAME = "GAME",
}