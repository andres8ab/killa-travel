import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/killa-travel.png'
import { UserNav } from './UserNav'
import { SearchModalComponent } from './SearchComponent'

export function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
        <Link href="/">
          <Image src={Logo} alt="Logo" className="w-20" />
        </Link>

        <SearchModalComponent />

        <UserNav />
      </div>
    </nav>
  )
}
