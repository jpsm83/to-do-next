/* eslint-disable react-hooks/rules-of-hooks */
// import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar/Navbar";
import moment from "moment";

export default function updateToDos({ toDo }) {
  const [form, setForm] = useState({ ...toDo });
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const updateToDo = async () => {
    if (Object.keys(errors).length === 0) {
      try {
        await fetch(`http://localhost:3000/api/todos/${toDo.id}`, {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(form),
        });
        router.push(`/${toDo.id}`);
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
    updateToDo();
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
      <h1>Upate To Do</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <label htmlFor="dueDate">
            {" "}
            Due Date:
            <input
              type="date"
              name="dueDate"
              value={moment(new Date(form.dueDate)).format("YYYY-MM-DD")}
              onChange={handleChange}
            />
          </label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

// server side rendering
updateToDos.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`);
  const { data } = await res.json();

  return { toDo: data };
};
