'use client'

import { checkAuth, removeToken } from "@/utils/CheckAuth";
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from 'js-cookie';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(checkAuth());
  const router = useRouter();
  const pathName = usePathname();

  const handleLogin = () => {
    if (isLoggedIn) {
      removeToken();
      setIsLoggedIn(false);
      router.push('/login');
    }
  };

  return (
    <div className="w-[20rem] bg-[#212529] text-white py-5 px-5 h-screen flex flex-col justify-between">
    <div>
      <p className="font-bold">PANEL PRESENSI</p>
      <div className="flex flex-col mt-10 gap-2">
        <Link
          className={`py-3 rounded text-center ${
            pathName === `/dashboard/${Cookies.get('id_presensi_kelas')}` ? 'bg-yellow-500' : 'bg-sky-700'
          }`}
          href={'/'}
        >
          Absensi
        </Link>
        <Link
          className={`py-3 rounded text-center ${
            pathName === '/list-mahasiswa' ? 'bg-yellow-500' : 'bg-sky-700'
          }`}
          href={'/list-mahasiswa'}
        >
          List Mahasiswa
        </Link>
      </div>
    </div>
    <div
      onClick={handleLogin}
      className="bg-red-500 py-3 text-center text-white rounded cursor-pointer"
    >
      <p>Logout</p>
    </div>
  </div>
  )
}

export default Navbar