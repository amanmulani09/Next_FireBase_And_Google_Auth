'use client'
import {useEffect} from 'react'
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Header = ({idle}:{idle:boolean})=>{
const {user,logout}:any = useAuth();
const router = useRouter();
const userName = user && user.email.split('@')[0]


const handleLogout = async()=>{
    try{
        await logout();
        toast('log out successfully!')
            router.push('/')

    }catch(error){
        toast('something went wrong')
        console.log("Error: ", error);
    }
}

useEffect(()=>{
    if(idle){
        handleLogout();
        setTimeout(()=>{
            router.push('/')
        },100)
    }

},[idle])

    return(
        <>
        <div className="shadow-lg w-full h-14 p-2 flex items-end justify-end">
            <p className='p-1 m-1 mr-8'>{idle ? '🔴 inActive' : '🟢 Active'}</p>
            <button className="mr-3 p-2 w-fit border border-blue-400 rounded hover:text-white hover:bg-blue-700" onClick={handleLogout}>Log Out</button>
            <p className="m-1 p-2 border-b border-blue-300 mr-5">{userName && userName}</p>
        <ToastContainer />
        </div>
        </>
    )
}

export default Header;