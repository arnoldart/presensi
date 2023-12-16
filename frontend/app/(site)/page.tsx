'use client'
import { checkAuth } from "@/utils/CheckAuth"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Cookies from 'js-cookie'

const Transition = () => {
  const router = useRouter()
  useEffect(() => {
    if(!checkAuth) {
      router.push('/login')
    }
    if(Cookies.get('id_presensi_kelas')) {
      router.push(`/dashboard/${Cookies.get('id_presensi_kelas')}`)
    }
  })
  return (
    <div></div>
  )
}
export default Transition