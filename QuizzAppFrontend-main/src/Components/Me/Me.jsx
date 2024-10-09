import { useEffect } from "react"
import { useAllUsers } from "../../Pages/Admin/ALLUsers/useAllUsers"
import { Outlet } from "react-router-dom";

export const Me = (props) =>{
    const {users} = useAllUsers(this?.token);
    const user =users?.find((user)=>
        user?.email === props?.email,
    )
    console.log(user,"user")
    useEffect(()=>{
        
        console.log(user,"user")
        if(user?.id){
            localStorage.setItem("name",user?.name);
            localStorage.setItem("id",user?.id);
        }
    },[user])
    return <>
    <Outlet/></>
}