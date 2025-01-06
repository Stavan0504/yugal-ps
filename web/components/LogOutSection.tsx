import { logout } from "@/utils/auth-helpers/actions";
import useSupabase from "@/utils/hooks/useSupabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const LogOutSection = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = useSupabase();

  const handleLogout = async () => {
    const result: any = await logout();

    if (result.status === "error") {
      setError(result.message);
    } else if (result.status === "success") {
      const { redirectUrl } = result;
      router.push(redirectUrl);
      toast.success("Log Out successfully!");
    }
  };
  return (
    <div className="bg-white p-4 sm:p-8  rounded-lg shadow-lg  border border-gray-200">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
        <h2 className="text-2xl font-semibold text-teal-600">Log Out</h2>
      </div>

      <div className="rounded-lg shadow-sm p-6 bg-gray-50 border border-gray-200 text-center">
        <p className="text-2xl font-medium text-gray-700 mb-4">
          Are you sure you want to log out?
        </p>
        <p className="text-base text-gray-500 mb-6">
          Logging out will end your current session. You can always log in again
          to continue using your account.
        </p>
        <div className="flex em:flex-row flex-col justify-center gap-4">
          <button
            className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md font-semibold shadow hover:bg-gray-300 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogOutSection;
