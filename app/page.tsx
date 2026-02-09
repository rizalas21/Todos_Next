"use client";

import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { TodoService } from "./services/todo";
import { Todo } from "@/types/todo";
import DeleteModal from "./components/DeleteModal";
import UpdateTodo from "./components/UpdateTodo";

export default function Home() {
  const [filter, setFilter] = useState("all");
  const [dropdown, setDropdown] = useState<string | null>("");
  const [data, setData] = useState<Todo[]>([]);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo>({
    id: "",
    title: "",
    description: "",
    completed: false,
    deadline: null,
    userid: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await TodoService.getTodos(filter);
      setData(data as Todo[]);
    };

    fetchData();
  }, [filter]);

  const refreshData = async () => {
    const { data } = await TodoService.getTodos(filter);
    setData(data as Todo[]);
  };

  return (
    <main className="bg-slate-100 flex min-w-screen flex-col min-h-full py-20">
      <section className="flex justify-start space-x-10 py-4 px-15">
        <button
          className={`text-lg font-bold cursor-pointer hover:underline hover:underline-offset-10 hover:text-blue-600 ${
            filter === "all"
              ? "underline underline-offset-10 text-blue-600"
              : "text-gray-600/50"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`text-lg font-bold cursor-pointer hover:underline hover:underline-offset-10 hover:text-blue-600 ${
            filter === "active"
              ? "underline underline-offset-10 text-blue-600"
              : "text-gray-600/50"
          }`}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={`text-lg font-bold cursor-pointer hover:underline hover:underline-offset-10 hover:text-blue-600 ${
            filter === "completed"
              ? "underline underline-offset-10 text-blue-600"
              : "text-gray-600/50"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </section>
      <section
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-4 px-15 ${data ? "" : "animate-pulse"}`}
      >
        {data.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition-shadow transition delay-100 duration-300 ease-in-out hover:scale-110 hover:shadow-4xl hover:shadow-blue-600/50 focus-within:scale-110 focus-within:shadow-4xl focus-within:shadow-blue-600/50 ${dropdown === item.id ? "scale-110 shadow-4xl shadow-blue-600/50" : ""}`}
          >
            {/* Title */}
            <div className="w-full flex justify-between items-start relative">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate">
                {item.title}
              </h3>
              <button
                onClick={() =>
                  setDropdown(dropdown === item.id ? null : item.id)
                }
                className="rounded-full px-2 py-2 text-sm hover:bg-gray-900/15"
              >
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </button>

              {dropdown === item.id && (
                <div className="absolute top-10 right-0 bg-white shadow-lg rounded-md z-20 w-32">
                  <button
                    onClick={() => {
                      setSelectedTodo(item);
                      setUpdateModal(true);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTodo(item);
                      setDeleteModal(true);
                    }}
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Description */}
            {item.description ? (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {item.description}
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic mb-4">
                No description
              </p>
            )}

            {/* Status */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  item.completed
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {item.completed ? "Completed" : "Active"}
              </span>

              {/* Toggle */}
              <label className="relative inline-flex items-center cursor-pointer z-0">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={item.completed}
                  onChange={async () => {
                    setData(
                      data.map((todo) =>
                        todo.id === item.id
                          ? { ...todo, completed: !todo.completed }
                          : todo,
                      ),
                    );
                    try {
                      await TodoService.updateTodo({
                        ...item,
                        completed: !item.completed,
                      });
                    } catch (error) {
                      setData(data);
                    }
                  }}
                />
                <div
                  className={`w-10 h-6 rounded-full transition-colors ${
                    item.completed ? "bg-blue-500" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    item.completed ? "translate-x-4" : "translate-x-0"
                  }`}
                ></div>
              </label>
            </div>

            {/* Timestamps */}
            <div className="text-xs text-gray-500 flex flex-col space-y-1">
              <p>
                Created:{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "-"}
              </p>
              <p>
                Finished:{" "}
                {item.updatedAt && item.completed
                  ? new Date(item.updatedAt).toLocaleString("id-ID", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "-"}
              </p>
              {item.deadline && item.completed === false && (
                <p className="">
                  Deadline:{" "}
                  {item.deadline
                    ? new Date(item.deadline).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "-"}
                </p>
              )}
            </div>
          </div>
        ))}
      </section>
      {deleteModal && (
        <DeleteModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
          selectedTodo={selectedTodo}
          refreshData={refreshData}
        />
      )}
      {updateModal && (
        <UpdateTodo
          updateModal={updateModal}
          setUpdateModal={setUpdateModal}
          data={selectedTodo}
          setData={setSelectedTodo}
          refreshData={refreshData}
        />
      )}
    </main>
  );
}
