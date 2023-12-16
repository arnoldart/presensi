"use client"
import { checkAuth } from "@/utils/CheckAuth";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie';

const Login = () => {
  const [nim, setNim] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter()

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/login');
    }
    if(Cookies.get('id_presensi_kelas')) {
      router.push(`/dashboard/${Cookies.get('id_presensi_kelas')}`)
    }
  }, [])

  const handlerLogin = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nim,
          password,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const token = responseData.token;
        const id = responseData.id;

        Cookies.set('token', token, { expires: 1, path: '/' });
        Cookies.set('id', id, { expires: 1, path: '/' });

        router.push('/new-presensi')

      } else {
        // Registrasi gagal, Anda dapat menangani kesalahan di sini
        console.error('Login gagal!');
      }
    } catch (e) {
      console.error('Error Register', e)
    }
  }

  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <div className="border border-gray-200 rounded-md p-5">
        <p className="text-xl font-bold">Login</p>
        <form action="" className="flex flex-col gap-y-3 mt-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">NIM</label>
            <div className="p-1 border border-gray-200 rounded">
              <input onChange={(e) => setNim(e.target.value)} className="outline-none" type="text" placeholder="Masukkan Username" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Password</label>
            <div className="p-1 border border-gray-200 rounded">
              <input onChange={(e) => setPassword(e.target.value)} className="outline-none" type="text" placeholder="Masukkan Password" />
            </div>
          </div>
        </form>
        <p className="text-gray-400 font-normal mt-5 text-sm">Belum punya akun? 
          <Link href={'/register'}>
            <span className="font-bold text-black"> Register</span>
          </Link>
        </p>
        <div onClick={handlerLogin} className="text-center bg-black text-white py-1 rounded mt-5 cursor-pointer">
          Login
        </div>
      </div>
    </div>
  )
}

export default Login