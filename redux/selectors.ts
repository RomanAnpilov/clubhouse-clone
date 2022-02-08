import { RootState } from "./types";

export const selectRooms = (state: RootState) => state.rooms.items;

export const selectUser = (state: RootState) => state.user.data;