import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar/Navbar";
import ToDoCard from "../components/ToDoCard/ToDoCard";

export default function Home({ toDos }) {
  const session = useSession();

  const displayToDoCards = () => {
    // you cant use .sort() in a object - first change it to an ARRAY
    let arrayToDos = Object.values(toDos);
    // must change dates to a "date object" to be interpreted by .sort()
    let organizedToDos = [...arrayToDos].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    return organizedToDos.map((toDo) => {
      if (toDo.user === session.data.user.email) {
        return <ToDoCard key={toDo.id} {...toDo} />;
      }
    });
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
        <div className="bg-gray-300 m-10 shadow-lg rounded-lg p-10">
          <h2 className="text-center text-xl sm:text-3xl font-bold text-yellow-600">
            Sign in and start to organize your agenda!
          </h2>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center m-5">
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
