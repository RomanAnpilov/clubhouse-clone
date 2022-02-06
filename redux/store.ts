import { configureStore } from '@reduxjs/toolkit'
import { roomsReducer } from './slices/roomSlice'

export const store = configureStore({
  reducer: {
      rooms: roomsReducer
  },
})
