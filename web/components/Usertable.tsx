import Link from "next/link";
import React from "react";

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
  last_sign_in_at: string;
  email_confirmed_at: string;
}

interface UsertableProps {
  data: User[];
}

const Usertable: React.FC<UsertableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              ID
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Email
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Role
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Created At
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Last Sign In
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Confirmed At
            </th>
            <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((user) => (
            <tr key={user?.id} className="border-b border-gray-200">
              <td className="py-3 px-4 text-sm text-gray-800">{user?.id}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{user?.email}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{user?.role}</td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {new Date(user?.created_at).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {new Date(user?.last_sign_in_at).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {new Date(user?.email_confirmed_at).toLocaleString()}
              </td>
              <td className="py-3 px-4 text-sm text-gray-800">
                <Link href={`/user/${user?.id}`}> Info.</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usertable;
