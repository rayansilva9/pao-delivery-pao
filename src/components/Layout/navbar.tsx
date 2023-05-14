import { usePathname } from "next/navigation";

const NavBar: React.FC = () => {
  const page = usePathname()

  return (
    <>
      <div
        style={{ display: page == "/signIn" || page == '/signUp' ? 'none' : 'inline' }}
        // className="fixed bottom-0 w-full h-9 bg-red-500"
      />
    </>
  );
}

export default NavBar;