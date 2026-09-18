import { configureStore } from '@reduxjs/toolkit'
import TodoSlice  from './TodoSlice'

const store = configureStore({
  reducer: {
    Todo:TodoSlice
  }
})

export type AppDispatch = typeof store.dispatch
export default store