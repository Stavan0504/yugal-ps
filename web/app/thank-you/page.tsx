// pages/thank-you.js

import Link from "next/link";

export default function ThankYou() {
  return (
    <div className="bg-white text-[#CBD5E1] flex items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-4xl font-semibold text-black mb-4">Thank You!</h1>
        <p className="text-lg text-[#0F172A] mb-6">
          Your details have been successfully submitted. We will be in touch
          with you shortly.
        </p>
        <Link href="/profile">
          <span className="bg-[#00adb5] text-white py-3 px-6 rounded-full text-lg hover:bg-[#009a9e] transition duration-300 transform hover:scale-105">
            Go to Your Profile
          </span>
        </Link>
      </div>
    </div>
  );
}
