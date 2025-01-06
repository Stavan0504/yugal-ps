import Dummy from "@/public/images/download.jpg";
import Image from "next/image";

const ShortlistSection = () => {
  const data = {
    "Shortlist Profiles": [
      {
        id: 1,
        name: "Aisha Patel",
        age: 26,
        profilePic: Dummy,
      },
      {
        id: 2,
        name: "Rohit Sharma",
        age: 29,
        profilePic: Dummy,
      },
    ],
  };
  return (
    <div className="bg-white p-4 sm:p-8  rounded-lg shadow-lg  border border-gray-200">
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-300">
        <h2 className="text-2xl font-semibold text-teal-600">
          ShortList Profiles
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {data["Shortlist Profiles"]?.map((profile) => (
          <div
            key={profile.id}
            className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200"
          >
            <Image
              src={Dummy}
              alt="Dummy Image"
              className="w-16 h-16 rounded-full mr-4"
            />
            <div>
              <p className="font-semibold text-gray-700">{profile?.name}</p>
              <p className="text-sm text-gray-500">{profile?.age} years old</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShortlistSection;
