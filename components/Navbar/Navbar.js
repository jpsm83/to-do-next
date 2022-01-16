import Link from "next/link";
import { signOut, signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <nav className="p-20 mb-20 bg-blue-400 text-white flex justify-between">
      <Link href="/">
        <a>To Do App</a>
      </Link>
      {session ? (
        <div>
          <Link href="/createToDos">
            <a>Create To Do</a>
          </Link>
          <div>
            <p>{session.user.name}</p>
            <div>
              <Image
                onClick={signOut}
                src={session.user.image}
                alt="User photo"
                width={150}
                height={40}
                objectFit="contain"
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={signIn}>Sign In</button>
        </div>
      )}
    </nav>
  );
}
