import { usePathname } from "next/navigation";
import { FaBars } from 'react-icons/fa'
import { BiCartAlt } from 'react-icons/bi'



const Header: React.FC = () => {

  const page = usePathname()



  return (
    <>
      <div
        style={{ display: page == "/signIn" || page == '/signUp' ? 'none' : 'flex' }}
        className="fixed top-0 w-full h-12 flex items-center justify-between px-5 py-3 ">
        <FaBars style={{ fontSize: '1.5rem', }} />
        <p className="font-semibold text-lg">HOME</p>
        <BiCartAlt style={{ fontSize: '1.5rem', }} />
      </div>
    </>
  );
}

export default Header;