import { Todo } from "@/types/todo";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, SetStateAction } from "react";
import { TodoService } from "../services/todo";

export default function DeleteModal({
  deleteModal,
  setDeleteModal,
  selectedTodo,
  refreshData,
}: {
  deleteModal: boolean;
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  selectedTodo: Todo;
  refreshData: () => void;
}) {
  console.log(deleteModal, selectedTodo);
  if (!deleteModal || !selectedTodo) return null;
  const handleDelete = async () => {
    try {
      const rows = await TodoService.deleteTodo(selectedTodo.id);
      refreshData();
      setDeleteModal(false);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };
  return (
    <main className="fixed inset-0 z-50 w-screen h-screen bg-black/40 flex justify-center items-center">
      <section className="rounded-lg bg-white shadow-xl flex flex-col items-center p-6 w-[90%] max-w-md space-y-6">
        <div className="w-full text-end">
          <button
            type="button"
            onClick={() => setDeleteModal(false)}
            className="cursor-pointer text-slate-500 hover:text-slate-700 transition"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
        <h1 className="font-bold text-2xl text-gray-800">Hapus Todo</h1>
        <p className="text-gray-600 text-center">
          Apakah kamu yakin ingin menghapus todo ini? Tindakan ini tidak bisa
          dibatalkan.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => setDeleteModal(false)}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Batal
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Hapus
          </button>
        </div>
      </section>
    </main>
  );
}
