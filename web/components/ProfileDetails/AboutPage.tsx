import { createClient } from "@/utils/auth-helpers/server";

type Data = {
  id: string;
  about_candidate: string;
  created_at: string;
  date_of_birth: string;
  gender: string;
  height: string;
  weight: number;
};

type Props = {
  id: string;
};

const AboutPage = async ({ id }: Props) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("about_you")
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
    about_candidate,
    created_at,
    date_of_birth,
    gender,
    height,
    weight,
  }: Data = data;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-6 w-full sm:w-96 mx-auto mt-5">
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Basic Information
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <strong>About User:</strong> {about_candidate}
          </p>
          <p>
            <strong>DOB:</strong> {date_of_birth}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
          <p>
            <strong>Weight:</strong> {weight}
          </p>
          <p>
            <strong>Height:</strong> {height}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
