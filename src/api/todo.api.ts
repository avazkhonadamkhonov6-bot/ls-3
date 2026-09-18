import { createAsyncThunk } from '@reduxjs/toolkit';
import  axios  from 'axios';

interface Iid{
    id:number|string
}

interface IUser{
    id:Number|string,
    name:string,
    description:string
}

interface Iedit{
    id:number|string,
    formData:FormData
}

export const url='https://to-dos-api.softclub.tj/api/to-dos'

export const getTodo=createAsyncThunk('todo/getTodo',async()=>{
    try {
        const {data}= await axios.get(url)
        return data.data
    } catch (error) {
        console.error(error);
    }
})

export const deleteTodo=createAsyncThunk('todo/deleteTodo',async(id:Iid,{dispatch})=>{
    try {
        await axios.delete(`${url}?id=${id}`)
        dispatch(getTodo())
    } catch (error) {
        console.error(error);
    }
})

export const editTodo=createAsyncThunk('todo/editTodo',async(upUser:IUser,{dispatch})=>{
    try {
        await axios.put(url,upUser)
        dispatch(getTodo())
    } catch (error) {
        console.error(error);
    }
})

export const addTodo=createAsyncThunk('todo/addTodo',async(formdata,{dispatch})=>{
    try {
        await axios.post(url,formdata)
        dispatch(getTodo())
    } catch (error) {
        console.error(error);
    }
})

export const deleteImg=createAsyncThunk('todo/deleteImg',async(id:Iid,{dispatch})=>{
    try {
        await axios.delete(`${url}/images/${id}`)
        dispatch(getTodo())
    } catch (error) {
        console.error(error);
    }
})

export const addImg=createAsyncThunk('todo/addImg',async({id,formData}:Iedit,{dispatch})=>{
    try {
        console.log(id);
        
        await axios.post(`${url}/${id}/images`,formData)
        dispatch(getTodo())
    } catch (error) {
        console.error(error);
    }
})