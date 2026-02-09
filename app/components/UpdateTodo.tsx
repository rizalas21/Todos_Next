import { Todo } from "@/types/todo";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { TodoService } from "../services/todo";

export default function UpdateTodo({
  updateModal,
  setUpdateModal,
  data,
  setData,
  refreshData,
}: {
  updateModal: boolean;
  setUpdateModal: Dispatch<SetStateAction<boolean>>;
  data: Todo;
  setData: Dispatch<SetStateAction<Todo>>;
  refreshData: () => void;
}) {
  const handleSubmit = async (e: any) => {
    try {
      const rows = await TodoService.updateTodo(data);
      refreshData();
      setUpdateModal(false);
    } catch (error) {
      console.error("Failed to delete todo:", error);
      alert("Failed to Update Todo, Please Try Again");
    }
  };

  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <main className="fixed inset-0 z-50 w-screen h-screen bg-black/40 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="rounded-lg bg-white shadow-lg flex flex-col items-center pt-2 pb-2 min-w-1/4 min-h-3/4 space-y-5"
      >
        <div className="w-full text-end px-2">
          <button
            type="button"
            onClick={() => setUpdateModal(false)}
            className={`cursor-pointer text-slate-900/25 text-lg hover:text-slate-900/50`}
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <h1 className="font-bold text-3xl text-gray-700">Add Todo</h1>
        <div className="inputan flex flex-col space-y-3">
          <input
            name="title"
            type="text"
            placeholder="Title"
            className="bg-white rounded-md border border-gray-800/25 px-3 py-2"
            value={data.title}
            onChange={handleChange}
          />
          <input
            name="description"
            type="text"
            placeholder="Description"
            className="bg-white rounded-md border border-gray-800/25 px-3 py-2"
            value={data.description}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            className="bg-white rounded-md border border-gray-800/25 px-3 py-2"
            name="deadline"
            value={
              data.deadline
                ? new Date(data.deadline).toISOString().slice(0, 16)
                : ""
            }
            onChange={handleChange}
          />
          <div className="flex w-full items-center justify-between bg-white rounded-md border border-gray-800/25 px-3 py-2">
            <span>Completed?</span>

            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={data.completed}
                onChange={(e) =>
                  setData({ ...data, completed: !data.completed })
                }
                className="sr-only"
              />

              <div
                className={`w-10 h-6 rounded-full transition-colors
         ${data.completed ? "bg-blue-500" : "bg-gray-300"}`}
              ></div>

              <div
                className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform
         ${data.completed ? "translate-x-4" : ""}`}
              ></div>
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={!data.title}
          className="w-8/12 rounded-lg px-4 py-2 text-white font-semibold transition bg-green-500 cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-green-600"
        >
          Save
        </button>
      </form>
    </main>
  );
}
