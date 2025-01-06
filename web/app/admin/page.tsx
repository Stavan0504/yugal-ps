import UserListTable from "@/components/admin/UserListTable";
import supabaseAdmin from "@/utils/auth-helpers/authClient";
import Header from "@/components/header";
import Footer from "@/components/footer";
import client from "@/lib/createClient";
import { query } from "@/lib/sanity/queries";
import { HeaderDataProps, SupabaseUser } from "@/lib/sanity/types";

type HeaderData = {
  header: HeaderDataProps;
};

const AdminDashboard = async () => {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();
  const headerData: HeaderData = await client.fetch(query.layoutProps);
  const { label, logo } = headerData.header;

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        <p>Error fetching users: {error.message}</p>
      </div>
    );
  }

  const filteredUsers = data?.users
    .map((user) => user)
    .filter(
      (user) => user?.app_metadata?.role !== "super-admin"
    ) as SupabaseUser[];

  return (
    <>
      <Header logo={logo} label={label} />
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4 mt-16">
          Welcome to the Admin Dashboard
        </h1>
        <UserListTable data={filteredUsers} />
        <Footer />
      </div>
    </>
  );
};

export default AdminDashboard;
