'use client';
import { useEffect } from "react";
import { useAuth } from "@/context/authContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
interface AuthWrapperProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<AuthWrapperProps> = ({ children }) => {
    const router = useRouter()
    const { data: session } = useSession();
    const { user } = useAuth();
    const isAuthenticated = user || session?.user
    useEffect(() => {
        // Redirect unauthenticated users to the login page
        if (!user && !session?.user) {
            router.push('/login');
        }
    }, [user, session?.user]);

    return isAuthenticated ? children : null;

}
export default ProtectedRoute;