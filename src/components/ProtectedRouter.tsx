'use client';
import { useAuth } from "@/context/authContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProtectedRoute = (props:any):any=>{
const {data:session} = useSession();
const {user}:any = useAuth();
const router = useRouter()
return (
    (user || session?.user?.name) ? props.children : router.push('/login')
)

}
export default ProtectedRoute;