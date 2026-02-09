import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";

export default function LogoutModal({
  logoutModal,
  setLogoutModal,
}: {
  logoutModal: boolean;
  setLogoutModal: Dispatch<SetStateAction<boolean>>;
}) {
  if (!logoutModal) return null;

  return (
    <main className="absolute inset-0 z-50 w-screen h-screen bg-black/40 flex justify-center items-center">
      <section className="rounded-lg bg-white shadow-xl flex flex-col items-center p-6 w-[90%] max-w-md space-y-6">
        <div className="w-full text-end">
          <button
            type="button"
            onClick={() => setLogoutModal(false)}
            className="cursor-pointer text-slate-500 hover:text-slate-700 transition"
          >
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>

        <h1 className="font-bold text-2xl text-gray-800">Konfirmasi Logout</h1>
        <p className="text-gray-600 text-center">
          Apakah kamu yakin ingin keluar dari akunmu? Semua sesi akan berakhir.
        </p>

        <div className="flex space-x-4">
          <button
            onClick={() => setLogoutModal(false)}
            className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Batal
          </button>
          <button
            onClick={() => {
              signOut({ callbackUrl: "/signin" });
              alert("User logged out");
              setLogoutModal(false);
            }}
            className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </section>
    </main>
  );
}
