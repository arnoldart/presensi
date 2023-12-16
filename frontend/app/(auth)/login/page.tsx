import Link from "next/link"

const Login = () => {
  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <div className="border border-gray-200 rounded-md p-5">
        <p className="text-xl font-bold">Login</p>
        <form action="" className="flex flex-col gap-y-3 mt-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">NIM</label>
            <div className="p-1 border border-gray-200 rounded">
              <input className="outline-none" type="text" placeholder="Masukkan Username" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Password</label>
            <div className="p-1 border border-gray-200 rounded">
              <input className="outline-none" type="text" placeholder="Masukkan Password" />
            </div>
          </div>
        </form>
        <p className="text-gray-400 font-normal mt-5 text-sm">Belum punya akun? 
          <Link href={'/register'}>
            <span className="font-bold text-black"> Register</span>
          </Link>
        </p>
        <div className="text-center bg-black text-white py-1 rounded mt-5 cursor-pointer">
          Login
        </div>
      </div>
    </div>
  )
}

export default Login