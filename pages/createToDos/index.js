/* eslint-disable react-hooks/rules-of-hooks */
// import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";

export default function createToDos() {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const createNewToDo = async () => {
    if (Object.keys(errors).length === 0) {
      try {
        await fetch("http://localhost:3000/api/todos", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(form),
        });
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const validate = () => {
    let err = {};
    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }
    if (!form.dueDate) {
      err.dueDate = "Due date is required";
    }
    return err;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errs = validate();
    setErrors(errs);
    createNewToDo();
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col bg-blue-200 m-10 shadow-lg space-y-4 rounded-lg p-5">
        <form
          className="flex flex-col p-5 space-y-3 bg-gray-100 rounded-lg"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-end">
            <label className="font-bold text-yellow-800" htmlFor="dueDate">
              Date:{" "}
            </label>
            <input
              className="text-yellow-800 outline-0 ml-2 rounded-lg px-2"
              type="date"
              name="dueDate"
              min={Date.now()}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-start w-full">
            <label className="font-bold text-yellow-800" htmlFor="title">
              Title:{" "}
            </label>
            <input
              className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
              type="text"
              placeholder="Title"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-start w-full">
            <label className="font-bold text-yellow-800" htmlFor="description">
              Description:{" "}
            </label>
            <input
              className="text-yellow-800 ml-2 outline-0 rounded-lg px-2 flex-grow"
              type="text"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-between">
            <button
              className="shadow-md text-white w-40 text-center justify-center px-6 py-1 hover:shadow-xl bg-green-700 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
              type="submit"
            >
              Create
            </button>
            <button
              className="shadow-md text-white w-40 text-center justify-center px-6 py-1 hover:shadow-xl bg-red-800 hover:scale-105 transition transform duration-200 ease-out rounded-lg"
              onClick={() => router.push("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
