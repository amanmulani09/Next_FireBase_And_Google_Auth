'use client'
import { useEffect, useRef, useState } from 'react'
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
const Header = ({ idle }: { idle: boolean }) => {
    const [timer, setTimer] = useState(60)
    const { logout, user } = useAuth();
    const router = useRouter();
    const { data: session } = useSession();
    const userName = user ? user.email.split('@')[0] : session?.user?.name
    const timerId = useRef<any>(null);
    const handleLogout = async () => {
        try {
            await logout();
            toast('log out successfully!')
            router.push('/login')
            signOut();
        } catch (error) {
            toast('something went wrong')
            console.log("Error: ", error);
        }
    }
    const resetTimer = () => {
        setTimer(60)
    }

    const setUp = () => {
        document.addEventListener("mousedown", resetTimer);
        document.addEventListener("wheel", resetTimer);
        document.addEventListener("mousemove", resetTimer);
        document.addEventListener("touchmove", resetTimer);
        document.addEventListener("keypress", resetTimer);
        document.addEventListener("keydown", resetTimer);
    };

    const cleanUp = () => {
        document.removeEventListener("mousedown", resetTimer);
        document.removeEventListener("wheel", resetTimer);
        document.removeEventListener("mousemove", resetTimer);
        document.removeEventListener("touchmove", resetTimer);
        document.removeEventListener("keypress", resetTimer);
        document.removeEventListener("keydown", resetTimer);

        //for memory leak
        clearTimeout(timerId.current);
    };

    useEffect(() => {
        setUp();
        timerId.current = setInterval(() => {
            setTimer(timer => timer - 1);
        }, 1000)

        if (idle) {
            clearInterval(timerId.current)
            handleLogout();
        }

        return () => {
            cleanUp();
        }
    }, [idle])
    return (
        <>
            <div className="shadow-lg w-full h-14 p-2 flex items-end justify-end">
                <p className='p-1 m-1 mr-8'>{timer && timer < 10 ? `⌚ 00:0${timer}` : `⌚ 00:${timer}`} </p>
                <p className='p-1 m-1 mr-8'>{idle ? '🔴 inActive' : '🟢 Active'}</p>
                <button className="mr-3 p-2 w-fit border border-blue-400 rounded hover:text-white hover:bg-blue-700" onClick={handleLogout}>Log Out</button>
                <p className="m-1 p-2 border-b border-blue-300 mr-5">{userName && userName}</p>
                <ToastContainer />
            </div>
        </>
    )
}

export default Header;