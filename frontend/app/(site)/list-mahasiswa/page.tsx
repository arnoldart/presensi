"use client"
import { checkAuth } from '@/utils/CheckAuth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ListMahasiswa() {
  const [userData, setUserData] = useState([])
  const [username, setUsername] = useState('')

  const fetchData = async (searchUsername: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get_users?nim=${searchUsername || ''}`, {
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
    fetchData(username);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const router = useRouter()

  useEffect(() => {
    if (!checkAuth()) {
      router.push('/login');
    }
    fetchData(username);
  }, [username]);

  return (
    <div className="py-5 px-5">
      <div className="flex justify-between">
        <h1 className='font-bold'>List Mahasiswa</h1>
        <form onChange={handleSearch}>
          <input value={username} onChange={handleInputChange} type="text" className="text-black outline-none border-2 border-black" placeholder="Search..." />
        </form>
      </div>
      <table className="w-full border border-black mt-3">
        <thead className="border border-black">
          <tr>
          <th className="border border-black p-2">Nama</th>
            <th className="border border-black p-2">NIM</th>
          </tr>
        </thead>
        <tbody>
          
        </tbody>
        {userData ? 
          (
            userData?.map((user:any) => (
              <tr key={user.id}>
                <td className="border border-black p-2">{user.name}</td>
                <td className="border border-black p-2">{user.nim}</td>
              </tr>
            ))
          ) : (
            <div>test</div>
          )
        }
      </table>
    </div>
  )
}
