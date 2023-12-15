import Image from 'next/image'

export default function Home() {
  return (
    <main className='p-5'>
      <p>Dashboard</p>
      <div className='flex bg-red-300'>
      <table className='w-full flex'>
        <thead>
          <tr>
            <td className='border border-black'>NIM</td>
            <td className='border border-black'>Nama</td>
          </tr>
        </thead>
      </table>
      </div>
    </main>
  )
}
