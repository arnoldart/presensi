"use client"
import { checkAuth } from '@/utils/CheckAuth';
import Image from 'next/image'
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
          // Add any additional headers or authentication tokens if needed
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
    // Check if the user is authenticated
    if (!checkAuth()) {
      // If not authenticated, redirect to the login page
      router.push('/login');
    }
    fetchData(username);
  }, [username]);

  return (
    <div className="py-5 px-5">
      <div className="flex justify-between">
        <h1>List Mahasiswa</h1>
        <form onChange={handleSearch}>
          <input value={username} onChange={handleInputChange} type="text" className="text-black outline-none border-2 border-black" placeholder="Search..." />
        </form>
      </div>
      {/* <div className="container mx-auto"> */}
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
              userData?.map((user):any => (
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
