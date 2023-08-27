"use client"
import { ToastContainer, toast } from 'react-toastify';
import {useState} from 'react'
import Link from "next/link";
import Image from "next/image";
import { useAuth } from '@/context/authContext';
import { useRouter } from 'next/navigation'
import { useSession,signIn,signOut } from 'next-auth/react';

import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
  const router = useRouter();
  const {createUser}:any = useAuth()
const {data:session} = useSession();

  // console.log(createUser)
  const [signUpCredentials,setSignUpCredentials] = useState({
    name:'',
    email:'',
    password:''
  })

  const handleSignup = async(event:React.SyntheticEvent)=>{
event && event.preventDefault();
    try{
      console.log('try blog')
    await createUser(signUpCredentials.email,signUpCredentials.password);
    toast('account created successfully!')
      router.push('/');
      setSignUpCredentials({
        name:'',
        email:'',
        password:''
      })
    }catch(error:any){
      toast(error.message)
      setSignUpCredentials({
        name:'',
        email:'',
        password:''
      })
      console.log(error)
    }

  }
  const  handleGoogleLogin = ()=>{
    try{
        signIn("google")
    }catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <div className="flex border w-3/4 h-3/4 rounded absolute top-[10%] left-[10%] shadow-lg">
        <div className="info-graphicContainer w-[50%] flex justify-center items-center border border-blue-100">
          <Image
            src={"/assets/form.svg"}
            alt="inforGraphic"
            width={400}
            height={400}
          />
        </div>
        <div className="form-container flex p-2 w-[50%] h-full flex-col justify-center items-center">
          <div className="heading margin-3 p-2">
            <h2 className="text-2xl"> Create Your Account </h2>
          </div>
          <form className="flex flex-col">
            <div className="p-2 m-1 flex flex-col ">
              <label htmlFor="name">
                {" "}
                Name{" "}
              </label>
              <input
                type="text"
                className="p-1 border border-blue-200 outline-0 rounded "
                placeholder='awesome name'
                onChange={(event)=>setSignUpCredentials({...signUpCredentials,name:event.target.value})}
              />
            </div>
            <div className="p-2 m-1 flex flex-col ">
              <label htmlFor="name">
                {" "}
                Email{" "}
              </label>
              <input
                type="text"
                className="p-1 border border-blue-200 outline-0 rounded "
                placeholder="awesomeuser@human.com"
                onChange={(event)=>setSignUpCredentials({...signUpCredentials,email:event.target.value})}
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
                onChange={(event)=>setSignUpCredentials({...signUpCredentials,password:event.target.value})}

              />
            </div>
            <button className="bg-blue-700 rounded text-white p-2 m-1 w-full mb-2" onClick={handleSignup}>
              {" "}
              Signup{" "}
            </button>
            {!session?.user &&  <button className="border border-blue-800 bg-white-700 rounded text-blue p-2 m-1 w-full mb-2 flex flex-row justify-evenly items-center"
            onClick={handleGoogleLogin}>
              {" "}
              <Image
              src={"/assets/google-logo.png"}
              alt="google Logo"
              width={30}
              height={20}
              />
              <p className="text-blue-800 font-semibold">continue with Google</p>
            </button> }
            <p>
              {" "}
              Already have an Account?{" "}
              <Link
                href="/login"
                className="text-blue-700 border-b border-blue-600"
              >
                {" "}
                login
              </Link>{" "}
            </p>
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
export default Signup;
