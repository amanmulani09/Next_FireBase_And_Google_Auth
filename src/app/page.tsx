'use client'
import ProtectedRoute from "@/components/ProtectedRouter"
import Header from "@/components/Header"
import useIdle from "@/hooks/useIdle"
import Image from "next/image"
const Page = () => {
  const idle = useIdle(60000);
  return (
    <ProtectedRoute>

      <>
      <Header idle={idle} />
      <Image
      className="mt-8 ml-48"
      src={"/assets/welcome.svg"}
      alt="welcome"
      width={1000}
      height={700}
      />
      </>
      </ProtectedRoute>
  );
};

export default Page;
