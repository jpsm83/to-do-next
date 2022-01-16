import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar/Navbar";
import ToDoCard from "../components/ToDoCard/ToDoCard";

export default function Home({ toDos }) {
  
const session = useSession()

  const displayToDoCards = () => {
    return toDos.map((toDo) => {
      if (toDo.user === session.data.user.email) {
        return <ToDoCard key={toDo.id} {...toDo} />;
      }
    });
  };

  const sortByDate = (a, b) => {
    if(a.dueDate > b.dueDate){
      return 1
    }
    if(a.dueDate < b.dueDate){
      return -1
    }
    return 0
  }

  return (
    <div>
      <Navbar />
      {!session.data ? (
        <div className="flex justify-center items-center">
          <h2>Sign in and start to organize your agenda!</h2>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <p>Hello {session.data.user.name}, welcome to our App!</p>
          {displayToDoCards().sort(sortByDate)}
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
