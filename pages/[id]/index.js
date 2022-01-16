import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import Link from "next/link";
import { StarIcon, CheckIcon } from "@heroicons/react/solid";
import { useState } from "react";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ToDo({ toDo }) {
  const { title, id, description, priority, done, dueDate, user } = toDo;

  const [isPriority, setIsPriority] = useState(priority);
  const [isDone, setIsDone] = useState(done);

  const router = useRouter();
  const session = useSession();

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
        <div>
          <h1>{title}</h1>
          <p>{description}</p>
          <p>{moment(new Date(dueDate)).format("DD-MMM-yyyy")}</p>
          <p
            onClick={() => toggleOptions("priority", isPriority, setIsPriority)}
          >
            {isPriority ? (
              <StarIcon className="h-5 text-yellow-500" />
            ) : (
              <StarIcon className="h-5 text-gray-400" />
            )}
          </p>
          <p onClick={() => toggleOptions("done", isDone, setIsDone)}>
            {isDone ? (
              <CheckIcon className="h-5 text-yellow-500" />
            ) : (
              <CheckIcon className="h-5 text-gray-400" />
            )}
          </p>
          <button onClick={() => router.push("/")}>Back to To Dos</button>
          <button onClick={deleteToDo}>Delete</button>
          <Link href={`/${id}/update`}>Edit To Do</Link>
        </div>
      )}
    </div>
  );
}

// server side rendering
ToDo.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`);
  const { data } = await res.json();
  return { toDo: data };
};
