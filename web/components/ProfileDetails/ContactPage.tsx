import { createClient } from "@/utils/auth-helpers/server";

type Data = {
  passport_pic: string;
  candidate_email: string;
  candidate_name: string;
  candidiate_mobile: string;
  created_at: string;
  profile_for: string;
};

type Props = {
  id: string;
};

const ContactPage = async ({ id }: Props) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contact")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No contact data found for this user.</div>;
  }

  const {
    candidate_email,
    candidate_name,
    candidiate_mobile,
    created_at,
    profile_for,
  }: Data = data;

  const formattedDate = new Date(created_at).toLocaleString();

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-6 space-y-6 w-full sm:w-96 mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {candidate_name}
          </h2>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Basic Information
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>
              <strong>Email:</strong> {candidate_email}
            </p>
            <p>
              <strong>Mobile:</strong> {candidiate_mobile}
            </p>
            <p>
              <strong>Profile For:</strong> {profile_for}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
