"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signup } from "../../../utils/auth-helpers/actions";
import Link from "next/link";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validationSchema = Yup.object({
    contactNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Invalid contact number").test(
        'no-html-tags',
        'HTML tags or scripts are not allowed',
        (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
      )
      .required("Contact number is required"),
    email: Yup.string()
      .email("Invalid email address").test(
        'no-html-tags',
        'HTML tags or scripts are not allowed',
        (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
      )
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one digit")
      .matches(/[\W_]/, "Password must contain at least one special character")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match").test(
        'no-html-tags',
        'HTML tags or scripts are not allowed',
        (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
      )
      .required("Please confirm your password"),
    tandc: Yup.bool().oneOf([true], "You must accept the terms and conditions"),
  });

  const formik = useFormik({
    initialValues: {
      contactNo: "",
      email: "",
      password: "",
      rePassword: "",
      tandc: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      setLoading(true);
      try {
        const form = new FormData();
        form.append("contactNo", values.contactNo);
        form.append("email", values.email);
        form.append("password", values.password);

        const result: any = await signup(form);

        if (result.status === "error") {
          toast.error(result.message);
        } else if (result.status === "success") {
          router.push("/sign-in");
          toast.success(
            "Account Created successfully! Check Email for Confirmation"
          );
        }
      } catch (err) {
        console.error("Error during signup:", err);
        toast.error("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="w-full min-h-screen flex flex-col font-outfit justify-center items-center px-5 py-28 ">
      <div className="bg-white p-6 em:p-8 rounded-lg border-[1px] border-brand-darkcyan/[20%] w-full mx-auto sm:w-full max-w-[480px]">
        <h2 className="text-2xl esm:text-start text-center font-semibold mb-6">
          Create Account
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-black text-lg mb-2"
              htmlFor="contactNo"
            >
              Contact Number
            </label>
            <input
              type="text"
              id="contactNo"
              name="contactNo"
              className="w-full px-3 py-2 border border-brand-darkcyan rounded"
              value={formik.values.contactNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.contactNo && formik.errors.contactNo && (
              <div className="text-red-500 text-sm">
                {formik.errors.contactNo}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-black text-lg mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 border border-brand-darkcyan rounded"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-black text-lg mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 border border-brand-darkcyan rounded"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mb-6">
            <label
              className="block text-black text-lg mb-2"
              htmlFor="re-password"
            >
              Re-Type Password
            </label>
            <input
              type="password"
              id="re-password"
              name="rePassword"
              className="w-full px-3 py-2 border border-brand-darkcyan rounded"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <div className="text-red-500 text-sm">
                {formik.errors.rePassword}
              </div>
            )}
          </div>
          <div className="mb-6 ">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="tandc"
                name="tandc"
                className=" px-3 py-2 border border-brand-darkcyan rounded"
                checked={formik.values.tandc}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label
                className="text-black text-lg leading-[110%]"
                htmlFor="tandc"
              >
                <span className="text-sm  font-bold text-brand-darkcyan cursor-pointer select-none ">
                  I agree to the
                  <span className="text-[#8c8c8c]  px-2">
                    Terms & Conditions
                    <span className="text-brand-darkcyan px-2">and</span>
                    Privacy Policy
                  </span>
                </span>
              </label>
            </div>
            {formik.touched.tandc && formik.errors.tandc && (
              <div className="text-red-500 text-sm">{formik.errors.tandc}</div>
            )}
          </div>
          <button
            type="submit"
            className="w-full text-white py-[12px] sm:py-[14px] text-base sm:text-lg rounded bg-brand-darkcyan hover:bg-transparent border-[1px] border-brand-darkcyan hover:text-brand-darkcyan BasicTransition"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </form>
        <p className="mt-6 text-lg text-start text-black block">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-brand-cyan hover:opacity-60 inline-block BasicTransition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
