'use client'
import { checkAuth } from "@/utils/CheckAuth";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'

const NewPresensi = () => {
  const [prodi, setProdi] = useState('');
  const [kelas, setKelas] = useState('');
  const [matkul, setMatkul] = useState('');
  const [tanggal, setTanggal] = useState('');

  const router = useRouter()

  useEffect(() => {
    // Cek apakah pengguna telah login
    if (!checkAuth()) {
      // Jika tidak, redirect ke halaman login
      router.push('/login');
    }else if(Cookies.get('id_presensi_kelas')) {
      router.push(`/dashboard/${Cookies.get('id_presensi_kelas')}`)
    }
  }, []);

  const handlerNewPresensi = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add_new_presensi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prodi,
          kelas,
          matkul,
          tanggal,
          user_id: Cookies.get('id')
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        const id_presensi_kelas = responseData.id_presensi_kelas;

        Cookies.set('id_presensi_kelas', id_presensi_kelas, { expires: 1, path: '/' });

        console.log('Registrasi berhasil!');
        router.push(`/dashboard/${id_presensi_kelas}`)        
      } else {
        console.error('Registrasi gagal!');

      }
    } catch (e) {
      console.error('Error Register', e)
    }
  }

  const handleProdiChange = (event:any) => {
    setProdi(event.target.value);
  };
  
  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <div className="border border-gray-200 rounded-md p-5">
        <p className="text-xl font-bold">Presensi Kelas</p>
        <form action="" className="flex flex-col gap-y-3 mt-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Prodi</label>
            <div className="p-1 border border-gray-200 rounded bg-transparent">
              <select onChange={handleProdiChange} className="outline-none bg-transparent">
                <option value="">Masukkan Prodi</option>
                <option value="teknik_komputer">Teknik Komputer</option>
                <option value="informatika">Informatika</option>
                <option value="ilmu_komunikasi">Ilmu Komunikasi</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Kelas</label>
            <div className="p-1 border border-gray-200 rounded">
              <input onChange={(e) => setKelas(e.target.value)} className="outline-none" type="text" placeholder="Masukkan Kelas" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Matakuliah</label>
            <div className="p-1 border border-gray-200 rounded">
              <input onChange={(e) => setMatkul(e.target.value)} className="outline-none" type="text" placeholder="Masukkan Matakuliah" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Date</label>
            <div className="p-1 border border-gray-200 rounded">
              <input onChange={(e) => setTanggal(e.target.value)} className="outline-none" type="date" />
            </div>
          </div>
        </form>
        <div onClick={handlerNewPresensi} className="text-center bg-black text-white py-1 rounded mt-5 cursor-pointer">
          Buat
        </div>
      </div>
    </div>
  )
}

export default NewPresensi