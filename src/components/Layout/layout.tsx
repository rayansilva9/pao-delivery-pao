import Head from "next/head";
import Header from "./header";
import { ReactNode, useContext } from "react";
import NavBar from "./navbar";
import { UserContext } from "@/context/userContext";

type props = {
  children: ReactNode
}

const Layout: React.FC<props> = ({ children }) => {

  const { user } = useContext(UserContext)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!user ? null : <Header />}
      {children}
      {!user ? null : <NavBar />}
    </>
  );
}

export default Layout;