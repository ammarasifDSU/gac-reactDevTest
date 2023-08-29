import axios from "axios"

const baseurl = "https://64905ded1e6aa71680cb200e.mockapi.io/api/"

export const AddNewTodoApi = (data) =>{
    axios.post(`${baseurl}/task`,data)
    .then((res)=>{
        if(res.status == 201)
        return true
    else return false
    })
    
}

export const fetchAlltodosApi =  () =>{
    return axios.get(`${baseurl}/task`)
}

export const deleteTodoApi = (id)=>{
    axios.delete(`${baseurl}/task/${id}`).then((res)=>{

    })
}

export const changeTodoStatusApi= (id,status)=>{
    axios.put(`${baseurl}/task/${id}`,{status}).then((res)=>{

    })
}
