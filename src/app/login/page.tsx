"use client"
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  })
  const { login }: any = useAuth();
  const router = useRouter();

  const { data: session } = useSession();

  const handleClick = async (event: React.SyntheticEvent) => {
    event && event.preventDefault();

    try {
      await login(loginCredentials.email, loginCredentials.password);
      toast('logged in successfully!');
      setLoginCredentials({
        email: '',
        password: ''
      })
      router.push('/');
    } catch (error) {
      toast('invalid credentails!')
      setLoginCredentials({
        email: '',
        password: ''
      })
      console.log(error)
    }
  }
  const handleGoogleLogin = async () => {

    try {
      await signIn();
      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const handleGoogleHome = (event: React.SyntheticEvent) => {
    event && event.preventDefault();
    router.push('/')
  }
  return (
    <>
      <div className="flex flex-col h-full w-full justify-center items-center border lg:w-3/4 lg:h-3/4 rounded absolute lg:top-[10%] lg:left-[10%] shadow-lg sm:flex-row md:flex-row lg:flex-row xl:flex-row ">
        <div className="h-full w-full info-graphicContainer sm:w-[50%] lg:w-[50%] flex justify-center items-center border border-blue-100">
          <Image
            className='w-full'
            src={"/assets/form.svg"}
            alt="inforGraphic"
            width={400}
            height={400}
          />
        </div>
        <div className="form-container flex p-2 w-[50%] h-full flex-col justify-center items-center">
          <div className="heading margin-3 p-2">
            <h2 className="text-2xl"> Welcome Again! </h2>
          </div>
          <form className="flex flex-col">
            <div className="p-2 m-1 flex flex-col ">
              <label htmlFor="name">
                {" "}
                Email{" "}
              </label>
              <input
                type="text"
                className="p-1 border border-blue-200 outline-0 rounded"
                placeholder="awesomeuser@human.com"
                onChange={(event) => setLoginCredentials({ ...loginCredentials, email: event.target.value })}
              />
            </div>
            <div className="p-2 m-1 flex flex-col">
              <label htmlFor="name">
                {" "}
                Password{" "}
              </label>
              <input
                type="text"
                className="p-1 border border-blue-200 outline-0 rounded "
                placeholder='please enter 8 digit password'
                onChange={(event) => setLoginCredentials({ ...loginCredentials, password: event.target.value })}
              />
            </div>
            <button className="bg-blue-700 rounded text-white p-2 m-1 w-full mb-2" onClick={handleClick}>
              {" "}
              Login{" "}
            </button>

            {!session?.user ? <button className="border border-blue-800 bg-white-700 rounded text-blue p-2 m-1 w-full mb-2 flex flex-row justify-evenly items-center"
              onClick={handleGoogleLogin}>
              {" "}
              <Image
                src={"/assets/google-logo.png"}
                alt="google Logo"
                width={30}
                height={20}
              />
              <p className="text-blue-800 font-semibold">continue with Google</p>
            </button> : <button className="bg-blue-700 rounded text-white p-2 m-1 w-full mb-2"
              onClick={handleGoogleHome}>
              {" "}
              Welcome {session.user.name} Go to Home {" "}
            </button>}

            <p>
              {" "}
              Don't have an Account?{" "}
              <Link
                href="/signup"
                className="text-blue-700 border-b border-blue-600"
              >
                {" "}
                create account
              </Link>{" "}
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Login;
