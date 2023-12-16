import Link from "next/link"

const Navbar = () => {
  return (
    <div className="w-[20rem] bg-gray-300 text-center py-5 h-screen">
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
  )
}

export default Navbar