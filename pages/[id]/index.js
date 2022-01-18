import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import Link from "next/link";
import { StarIcon, CheckIcon } from "@heroicons/react/solid";
import { useState } from "react";
import moment from "moment";
import { useSession } from "next-auth/react";

export default function ToDo({ toDo }) {

  const { title, id, description, priority, done, dueDate } = toDo
  const [isPriority, setIsPriority] = useState(priority);
  const [isDone, setIsDone] = useState(done);

  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const deleteToDo = async () => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const toggleOptions = async (keyType, option, setOption) => {
    setOption((option = !option));
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({ [keyType]: `${option}` }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      {session && (
        <div className="flex flex-col bg-blue-200 shadow-lg m-10 space-y-4 rounded-lg p-5">
          <div className="flex space-x-6 justify-center p-3 bg-gray-100 rounded-lg">
            <p
              onClick={() =>
                toggleOptions("priority", isPriority, setIsPriority)
              }
            >
              {isPriority ? (
                <StarIcon className="h-7 text-yellow-500" />
              ) : (
                <StarIcon className="h-7 text-gray-400" />
              )}
            </p>
            <p className="text-md sm:text-lg italic font-bold text-gray-500">
              Due Date: {moment(new Date(dueDate)).format("DD-MMM-yyyy")}
            </p>
            <p onClick={() => toggleOptions("done", isDone, setIsDone)}>
              {isDone ? (
                <CheckIcon className="h-7 text-green-600" />
              ) : (
                <CheckIcon className="h-7 text-gray-400" />
              )}
            </p>
          </div>
          <div className="flex flex-col justify-items-start p-3 bg-gray-100 rounded-lg">
            <p className="text-xl text-yellow-800 sm:text-3xl font-bold mb-3">
              {title}
            </p>
            <p className="text-md sm:text-lg">
            {description}
            </p>
          </div>
          <div className="flex justify-between">
            <button
              className="shadow-md items-center text-white text-center justify-center px-6 py-1 hover:shadow-xl bg-yellow-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
              onClick={() => router.push("/")}
            >
              Back to To Dos
            </button>
            <button
              className="shadow-md items-center text-white text-center justify-center px-6 py-1 hover:shadow-xl bg-red-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
              onClick={deleteToDo}
            >
              Delete
            </button>
            <button
              className="shadow-md items-center text-white text-center justify-center px-6 py-1 hover:shadow-xl bg-green-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg">
              <Link href={`/${id}/update`}>Edit To Do</Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// server side rendering
ToDo.getInitialProps = async ({ query: { id }  }) => {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`);
  const { data } = await res.json();
  return { toDo: data };
};
