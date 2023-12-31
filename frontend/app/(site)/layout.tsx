import Navbar from './_components/Navbar'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex'>
        <Navbar />
        <div className='flex-1'>{children}</div>
    </div>
  )
}
