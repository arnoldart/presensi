'use client'

import { checkAuth, removeToken } from "@/utils/CheckAuth";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkAuth());
  const router = useRouter();

  const handleLogin = () => {
    if (isLoggedIn) {
      removeToken();
      setIsLoggedIn(false);
      router.push('/login');
    }
  };
  
  return (
    <div className="w-[20rem] bg-gray-300 text-center py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <p>ADMIN</p>
        <div className="flex flex-col">
          <Link href={'/'}>
            Absensi
          </Link>
          <Link href={'/list-mahasiswa'}>
            List Mahasiswa
          </Link>
        </div>
      </div>
      <div onClick={handleLogin} className="bg-red-500 text-white rounded cursor-pointer">
        <p>Logout</p>
      </div>
    </div>
  )
}

export default Navbar