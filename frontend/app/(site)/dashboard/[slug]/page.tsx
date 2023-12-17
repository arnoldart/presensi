"use client"
import { checkAuth } from '@/utils/CheckAuth';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function Home() {
  const [nim, setNim] = useState('');
  const [searchNim, setSearchNim] = useState('')
  const [userData, setUserData] = useState([])
  const router = useRouter()
  useEffect(() => {
    // Cek apakah pengguna telah login
    if (!checkAuth()) {
      // Jika tidak, redirect ke halaman login
      router.push('/login');
    }
    else {
      router.push(`/dashboard/${Cookies.get('id_presensi_kelas')}`)
    }

    fetchData(searchNim);
  }, [searchNim]);
  

  const handlerNewPresensi = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add_presensi_mahasiswa`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nim,
          id_presensi_kelas: Cookies.get('id_presensi_kelas')
        }),
      });

      if (response.ok) {
        // Registrasi berhasil, Anda mungkin ingin melakukan navigasi atau menangani respons API sesuai kebutuhan

        console.log('Registrasi berhasil!');
        fetchData(searchNim);
      } else {
        // Registrasi gagal, Anda dapat menangani kesalahan di sini
        console.error('Registrasi gagal!');

      }
    } catch (e) {
      console.error('Error Register', e)
    }
  }

  const fetchData = async (nim: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_all_presensi_by_id/${Cookies.get('id_presensi_kelas')}?nim=${nim}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error('Error fetching user data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    fetchData(searchNim);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchNim(event.target.value);
  };

  const deleteUser = async (presensi_id:any, nim:any) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete_presensi_mahasiswa/${presensi_id}/${nim}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      fetchData(searchNim);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="py-5 px-5">
      <div className="flex justify-between">
        <div className='flex items-center'>
          <form>
            <input onChange={(e) => setNim(e.target.value)} type="text" className="text-black outline-none border-2 border-black" placeholder="Masukkan NIM"/>
          </form>
          <div onClick={handlerNewPresensi} className='inline-block bg-black text-white rounded py-[.1rem] px-5 ml-3 cursor-pointer'>
            OK
          </div>
        </div>
        <form onChange={handleSearch}>
          <input value={searchNim} onChange={handleInputChange} type="text" className="text-black outline-none border-2 border-black" placeholder="Search..." />
        </form>
      </div>
      {/* <div className="container mx-auto"> */}
        <table className="w-full border border-black mt-3">
          <thead className="border border-black">
            <tr>
              <th className="border border-black p-2">Nama</th>
              <th className="border border-black p-2">NIM</th>
              <th className="border border-black p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData ?
              (userData?.map((user:any) => (
                <tr key={user.id}>
                  <td className="border border-black p-2">{user.nama}</td>
                  <td className="border border-black p-2">{user.nim}</td>
                  <td className="border border-black p-2">
                    <div className="justify-center flex">
                      <div onClick={() => deleteUser(Cookies.get('id_presensi_kelas'), user.nim, )} className="bg-red-500 text-white rounded cursor-pointer text-center inline-block px-3 py-1">
                        <p>Delete</p>
                      </div>
                    </div>
                  </td>
                </tr>
              )))
              :
              (
                <tr>
                  <td className="border border-black p-2">
                    No user data available.
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
    </div>
  )
}
