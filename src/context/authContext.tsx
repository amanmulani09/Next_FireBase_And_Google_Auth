"use client"
import { useContext, createContext,useEffect,useState } from "react";
import {auth} from '../utils/firebase'
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

interface AuthContextType {
  user: string;
  createUser: (email:string,password:string) => void;
  login : (email:string,password:string)=> void;
  logout:()=> void;
  // Other properties and methods related to authentication
}

const authContext =  createContext<AuthContextType | null>(null);

const AuthContextProvider = ({children}:any)=>{
    const [user,setUser] = useState('');

    const createUser = (email:string,password:string)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const login = (email:string,password:string)=>{
        return signInWithEmailAndPassword(auth,email,password);
    }

    const logout = ()=>{
        signOut(auth)
    }

    useEffect(()=>{

        const unsubScribe = onAuthStateChanged(auth,(currentuser:any)=>{
            setUser(currentuser)
        })
return ()=>{
    unsubScribe();
}
    },)

    return(
        <authContext.Provider value={{
            createUser,
            login,
            logout,
            user
        }}>
                {children}
        </authContext.Provider>
    )
}

const useAuth = ()=>{
    return useContext(authContext)
}

export {AuthContextProvider,useAuth}