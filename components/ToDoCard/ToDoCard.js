/* eslint-disable @next/next/link-passhref */
import Link from "next/link";
import moment from "moment";
import { StarIcon, CheckIcon } from "@heroicons/react/solid";
import { useState } from "react";

export default function ToDoCard({
  title,
  id,
  description,
  priority,
  done,
  dueDate,
}) {
  
  const [isPriority, setIsPriority] = useState(priority);
  const [isDone, setIsDone] = useState(done);

  // const togglePriority = async () => {
  //   setIsPriority(isPriority = !isPriority);
  //   try {
  //     await fetch(`http://localhost:3000/api/todos/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({ priority: isPriority}),
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
      <p onClick={() => toggleOptions("priority", isPriority, setIsPriority)}>
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

      <Link href={`/${id}`}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{moment(new Date(dueDate)).format("DD-MMM-yyyy")}</p>
        </div>
      </Link>
    </div>
  );
}
