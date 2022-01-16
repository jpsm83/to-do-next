import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar/Navbar";
import ToDoCard from "../components/ToDoCard/ToDoCard";

export default function Home({ toDos }) {
  const session = useSession();

  const displayToDoCards = () => {
    return toDos.map((toDo) => {
      if (toDo.user === session.data.user.email) {
        return <ToDoCard key={toDo.id} {...toDo} />
      }
    }).sort(sortByChoosen("done"));
  };
  // this function is working properly
  // DONT TOUCH
  function sortByChoosen(sortType) {
    return (a, b) => b[sortType] - a[sortType];
  }

  return (
    <div>
      <Navbar />
      {!session.data ? (
        <div className="flex justify-center items-center">
          <h2>Sign in and start to organize your agenda!</h2>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mb-10">
          <p>Hello {session.data.user.name}, welcome to our App!</p>
          {displayToDoCards()}
        </div>
      )}
    </div>
  );
}

Home.getInitialProps = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/todos");
    const { data } = await res.json();
    return {
      toDos: data,
    };
  } catch (error) {
    return {
      toDos: null,
    };
  }
};
