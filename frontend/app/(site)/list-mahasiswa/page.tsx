import Image from 'next/image'

export default function ListMahasiswa() {
  return (
    <div className="py-3 px-5">
      <div className="flex justify-between">
        <h1>List Mahasiswa</h1>
        <form>
          <input type="text" className="text-black outline-none border-2 border-black" placeholder="Search..." />
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
            
          </tbody>
          {/* <tbody> */}
          {/* {userData ? (
            userData?.map((user:any) => (
              <tr key={user.id}>
                <td className="border border-black p-2">{user.username}</td>
                <td className="border border-black p-2">{user.email}</td>
                <td className="border border-black p-2">{user.role}</td>
                <td className="border border-black p-2">
                  <div className="justify-center flex">
                    <div onClick={() => deleteUser(user.id)} className="bg-red-500 text-white rounded cursor-pointer text-center inline-block px-3 py-1">
                      <p>Delete</p>
                    </div>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border border-black p-2">
                No user data available.
              </td>
            </tr>
          )} */}
        {/* </tbody> */}
        </table>
    </div>
  )
}
