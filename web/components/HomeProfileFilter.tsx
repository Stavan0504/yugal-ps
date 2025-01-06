"use client";
import React, { useEffect, useState } from "react";
import options from "@/store/options.json";
import { Field, Form, Formik } from "formik";

const HomeProfileFilter = () => {
  const initialValues = {
    residency_status: "",
    gender: "",
    religion: "",
    mother_tongue: "",
  };

  const { Gender, Religion, Mother_Tongue, Age_To, Age_From } = options;

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data = await res.json();
      const commonNames = data
      ?.map((country: { name: { common: string } }) => country?.name?.common)
        .sort();
      setCountries(commonNames);
    };

    fetchCountries();
  }, []);

  const handleSubmit = (values: typeof initialValues) => {
    // console.log(values);
  };

  return (
    <div className="container !mt-[-20px] relative z-10 ">
      <div className="bg-[#D9D9D9] flex justify-between  items-center px-9 py-[14px]">
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ values, handleChange, handleBlur }) => (
            <Form className="flex">
              <div className="flex flex-col w-full">
                <span className="text-base text-black">I'm looking For</span>
                <Field as="select" name="residency_status">
                  {/* <option value="">Male</option> */}
                  {Gender?.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Field>
              </div>
              <div className="flex flex-col w-full">
                <span className="text-base text-black">Aged</span>
                <div className="flex items-center">
                  <Field as="select" name="residency_status">
                    {/* <option value="">Male</option> */}
                    {Age_From?.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Field>
                  <span className="text-base text-black">to</span>
                  <Field as="select" name="residency_status">
                    {/* <option value="">Male</option> */}
                    {Age_To?.map((i) => (
                      <option key={i} value={i}>
                        {i}
                      </option>
                    ))}
                  </Field>
                </div>
              </div>
              <div>
                <span className="text-base text-black">Religion</span>
                <Field as="select" name="residency_status">
                  {/* <option value="">Hindu</option> */}
                  {Religion?.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Field>
              </div>
              <div>
                <span className="text-base text-black">Location</span>
                <Field as="select" name="country">
                  <option value="">Select...</option>
                  {countries?.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                  {/* Add more options as needed */}
                </Field>
              </div>
              <div>
                <span className="text-base text-black">Mother Tongue</span>
                <Field as="select" name="residency_status">
                  {/* <option value="">Gujarati</option> */}
                  {Mother_Tongue?.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </Field>
              </div>
              <button>Search</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default HomeProfileFilter;
