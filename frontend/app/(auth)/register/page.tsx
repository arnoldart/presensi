"use client";
import { checkAuth } from "@/utils/CheckAuth";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'

const Register = () => {
  const [nim, setNim] = useState('');
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('');

  const router = useRouter()
  
  useEffect(() => {
    if (!checkAuth()) {
      // router.push('/login');
    }else {
      console.log('sudah login')
    }
  }, [])

  const handlerRegister = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nim,
          username,
          password,
        }),
      });

      if (response.ok) {
        // Registrasi berhasil, Anda mungkin ingin melakukan navigasi atau menangani respons API sesuai kebutuhan
        console.log('Registrasi berhasil!');
        router.push('/login')        
      } else {
        // Registrasi gagal, Anda dapat menangani kesalahan di sini
        console.error('Registrasi gagal!');

      }
    } catch (e) {
      console.error('Error Register', e)
    }
  }

  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <div className="border border-gray-200 rounded-md p-5">
        <p className="text-xl font-bold">Register</p>
        <form action="" className="flex flex-col gap-y-3 mt-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">NIM</label>
            <div className="p-1 border border-gray-200 rounded">
              <input onChange={(e) => setNim(e.target.value)} className="outline-none" type="text" placeholder="Masukkan NIM" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Username</label>
            <div className="p-1 border border-gray-200 rounded">
              <input onChange={(e) => setUsername(e.target.value)} className="outline-none" type="text" placeholder="Masukkan Username" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Password</label>
            <div className="p-1 border border-gray-200 rounded">
              <input onChange={(e) => setPassword(e.target.value)} className="outline-none" type="text" placeholder="Masukkan Password" />
            </div>
          </div>
        </form>
        <p className="text-gray-400 font-normal mt-5 text-sm">Sudah punya akun? 
          <Link href={'/login'}>
            <span className="font-bold text-black"> Login</span>
          </Link>
        </p>
        <div onClick={handlerRegister} className="text-center bg-black text-white py-1 rounded mt-5 cursor-pointer">
          Register
        </div>
      </div>
    </div>
  )
}

export default Register