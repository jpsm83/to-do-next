import { useSession, getSession } from "next-auth/react";
import Navbar from "../components/Navbar/Navbar";
import ToDoCard from "../components/ToDoCard/ToDoCard";

export default function Home({ toDos, getSession }) {
  
  console.log(getSession)
  
  const displayToDoCards = () => {
    return toDos.map((toDo) => {
      if (toDo.user === getSession.user.email) {
        return <ToDoCard key={toDo.id} {...toDo} />;
      }
    });
  };

  return (
    <div>
      <Navbar />
      {!getSession ? (
        <div>
          <h2>Sign in and start to organize your agenda!</h2>
        </div>
      ) : (
        <div>
          <p>Hello {getSession.user.name}, welcome to our App!</p>
          {displayToDoCards()}
        </div>
      )}
    </div>
  );
}

Home.getInitialProps = async (context) => {
  try {
    const res = await fetch("http://localhost:3000/api/todos");
    const { data } = await res.json();
    return {
      toDos: data,
      getSession: await getSession(context)
    };
  } catch (error) {
    return {
      toDos: null,
    };
  }
};
