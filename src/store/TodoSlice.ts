import {  createSlice } from '@reduxjs/toolkit'
import { getTodo } from '../api/todo.api'

interface Images{
    id:number,
    imageName:string
}

interface IData{
    id:number,
    name:string,
    description:string
    isCompleted:boolean,
    images:Images[]
}

interface todoState{
    data:IData[]
    isloading:boolean
}

const  initialState:todoState={
    data:[],
    isloading:false
}

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers:(bulders)=>{
    bulders.addCase(getTodo.pending,(state)=>{
        state.isloading= true
    })
    .addCase(getTodo.fulfilled,(state,action)=>{
        state.data=action.payload
        state.isloading=false
    })
    .addCase(getTodo.rejected,(state)=>{
        state.isloading=false
    })
  }
})

export const {} = TodoSlice.actions

export default TodoSlice.reducer