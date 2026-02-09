import { useState } from "react";
import { AddTodo } from "./AddTodo";
import { useSession } from "next-auth/react";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const [todoModal, setTodoModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const { data, status } = useSession();

  return (
    <nav className="max-w-screen w-full px-15 py-5 flex justify-between items-center bg-white fixed z-40">
      <h2 className="text-2xl w-1/4 font-bold">Hi, {data?.user.name}!</h2>
      <div className="w-1/4 text-lg text-end space-x-10">
        <button
          onClick={() => setLogoutModal(true)}
          className="text-blue-500 font-bold cursor-pointer hover:text-blue-600 hover:underline"
        >
          Logout
        </button>
        <button
          onClick={() => setTodoModal(true)}
          className="bg-blue-400 text-white text-base text-center px-4 py-2 rounded-md font-bold text-center cursor-pointer hover:bg-blue-500"
        >
          + &nbsp; &nbsp;Add Todo
        </button>
      </div>
      {todoModal && (
        <AddTodo todoModal={todoModal} setTodoModal={setTodoModal} />
      )}
      {logoutModal && (
        <LogoutModal
          logoutModal={logoutModal}
          setLogoutModal={setLogoutModal}
        />
      )}
    </nav>
  );
}
