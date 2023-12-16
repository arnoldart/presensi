import Link from "next/link"

const NewPresensi = () => {
  return (
    <div className="flex justify-center h-screen items-center flex-col">
      <div className="border border-gray-200 rounded-md p-5">
        <p className="text-xl font-bold">Presensi Kelas</p>
        <form action="" className="flex flex-col gap-y-3 mt-4">
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Prodi</label>
            <div className="p-1 border border-gray-200 rounded">
              <input className="outline-none" type="text" placeholder="Masukkan Prodi" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Kelas</label>
            <div className="p-1 border border-gray-200 rounded">
              <input className="outline-none" type="text" placeholder="Masukkan Kelas" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Mata Kuliah</label>
            <div className="p-1 border border-gray-200 rounded bg-transparent">
              <select className="outline-none bg-transparent	">
                <option value="teknik_komputer">Teknik Komputer</option>
                <option value="informatika">Informatika</option>
                <option value="ilmu_komputer">Ilmu Komputer</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Prodi</label>
            <div className="p-1 border border-gray-200 rounded">
              <input className="outline-none" type="date" placeholder="Masukkan Prodi" />
            </div>
          </div>
        </form>
        <div className="text-center bg-black text-white py-1 rounded mt-5 cursor-pointer">
          Buat
        </div>
      </div>
    </div>
  )
}

export default NewPresensi