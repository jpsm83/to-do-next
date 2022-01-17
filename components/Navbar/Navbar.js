/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { BookOpenIcon, LoginIcon, LogoutIcon } from "@heroicons/react/outline";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      <div className="p-5 bg-blue-400 text-white flex justify-between">
        <Link href="/">
          <div className="cursor-pointer flex space-x-2 items-center justify-start mr-6">
            <BookOpenIcon className="h-10" />
            <a>To Do App</a>
          </div>
        </Link>
        {session ? (
          <div className="flex space-x-4 items-center justify-between">
            <p className="font-bold sm:text-xl text-md">Hello {session.user.name}</p>
            <div
              onClick={signOut}
              className="cursor-pointer flex space-x-2 items-center"
            >
              <Image
                src={session.user.image}
                alt="User photo"
                width={50}
                height={50}
                objectFit="contain"
                className="flex justify-center overflow-hidden items-center rounded-full"
              />
              <LogoutIcon className="h-8" />
            </div>
          </div>
        ) : (
            <button onClick={signIn} className="flex space-x-2 items-center">
            <p>Sign In</p>
            <LoginIcon className="h-10" />
            </button>
        )}
      </div>
      {session && (
        <div className="bg-gray-300 p-3 flex justify-center">
        <Link href="/createToDos">
          <button className="cursor-pointer shadow-md items-center pb-1 text-white text-center justify-center px-6 hover:bg-green-800 font-bold hover:shadow-xl bg-green-700 hover:scale-105 transition transform duration-200 ease-out active:scale-90 rounded-lg ">
            Create To Do
          </button>
        </Link>
      </div>
      )}
    </nav>
  );
}
