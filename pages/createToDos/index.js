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
      <h1>Create To Do</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            onChange={handleChange}
          />
          <label htmlFor="dueDate">
            {" "}
            Due Date:
            <input
              type="date"
              name="dueDate"
              min={Date.now()}
              onChange={handleChange}
            />
          </label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={handleChange}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}
