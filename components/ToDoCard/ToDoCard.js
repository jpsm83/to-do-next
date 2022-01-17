/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import moment from "moment";
import { StarIcon, CheckIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { useRouter } from "next/router";

export default function ToDoCard({ title, id, priority, done, dueDate }) {
  const [isPriority, setIsPriority] = useState(priority);
  const [isDone, setIsDone] = useState(done);

  const router = useRouter();

  const deleteToDo = async () => {
    try {
      await fetch(`http://localhost:3000/api/todos/${id}`, {
        method: "DELETE",
      });
      router.reload();
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
    <div className="flex cursor-pointer justify-start w-80 mx-5 bg-gray-300 shadow-lg hover:shadow-xl hover:bg-blue-200 m-3 rounded-lg p-2">
      <h1 className="text-4xl mr-2 sm:text-5xl bg-gray-100 font-bold text-yellow-600 rounded-lg p-1 flex justify-center items-center">
        {moment(new Date(dueDate)).format("DD")}
      </h1>
      <div className="text-md sm:text-lg flex flex-col w-full">
        <div className="flex justify-between">
          <p className="font-bold text-gray-700">
            {moment(new Date(dueDate)).format("MMM-yyyy")}
          </p>
          <div className="flex">
            <p
              onClick={() =>
                toggleOptions("priority", isPriority, setIsPriority)
              }
            >
              {isPriority ? (
                <StarIcon className="h-5 text-yellow-500" />
              ) : (
                <StarIcon className="h-5 text-gray-400" />
              )}
            </p>
            <p onClick={() => toggleOptions("done", isDone, setIsDone)}>
              {isDone ? (
                <CheckIcon className="h-5 text-green-600" />
              ) : (
                <CheckIcon className="h-5 text-gray-400" />
              )}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
        <Link href={`/${id}`}>
          <div>
            <h2 className="text-md text-yellow-800 sm:text-lg">{title}</h2>
          </div>
        </Link>
        {isDone && <button className="shadow-md items-center text-white text-center justify-center px-6 hover:shadow-xl bg-red-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
 onClick={deleteToDo}>Delete</button>}
 </div>
      </div>
    </div>
  );
}
