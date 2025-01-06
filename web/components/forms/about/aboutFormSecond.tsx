import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import TablistButtons from "@/components/Tablist/tablistButtons";
import options from "@/store/options.json";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { AboutYouSecondForm as AboutYouSecondType } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";
import { toast } from "sonner";

const {
  Marital_Status,
  Have_children,
  No_of_Children,
  Health_Information,
  Disability,
  Blood_Group,
} = options;

interface FormValues {
  marital_status: string;
  have_children: string;
  no_of_children: string;
  health_information: string;
  any_disability: string;
  blood_group: string;
  describe_disability: string;
  hobby_intrest: string[];
}

interface User {
  user: {
    id: string;
  } | null;
  loading: boolean;
  error: string | null;
}

const AboutYouFormSecond = () => {
  const supabase = useSupabase();
  const [dbData, setDbData] = useState<AboutYouSecondType>();
  const formikRef = useRef<FormikProps<AboutYouSecondType>>(null);
  const { user, loading, error } = useUser();

  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const suggestionsArray = [
    "Reading",
    "Cooking",
    "Gardening",
    "Painting",
    "Hiking",
    "Photography",
    "Cycling",
    "Playing musical instruments",
    "Yoga",
    "Playing video games",
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("about_you_second")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.log("Error fetching contact data:", error);
        } else {
          setDbData(data);
        }
      }
    };

    fetchData();
  }, [user, supabase]);

  useEffect(() => {
    if (dbData && formikRef.current) {
      formikRef.current.setValues({
        marital_status: dbData.marital_status || "",
        have_children: dbData.have_children || "",
        no_of_children: dbData.no_of_children || "",
        health_information: dbData.health_information || "",
        any_disability: dbData.any_disability || "",
        blood_group: dbData.blood_group || "",
        describe_disability: dbData.describe_disability || "",
        hobby_intrest: dbData.hobby_intrest || [],
      });
    }
  }, [dbData]);

  const validationSchema = Yup.object({
    marital_status: Yup.string().required("Marital status is required"),
    have_children: Yup.string().when("marital_status", {
      is: "Married",
      then: (s) => s.required("Have children is required"),
      otherwise: (s) => s.notRequired(),
    }),
    no_of_children: Yup.string().when("have_children", {
      is: "Yes",
      then: (s) => s.required("Number of children is required"),
      otherwise: (s) => s.notRequired(),
    }),
    health_information: Yup.string().required("Health info is required"),
    any_disability: Yup.string().required("Disability is required"),
    blood_group: Yup.string().required("Blood group is required"),
    describe_disability: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ),
    hobby_intrest: Yup.array().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as any)
    ).required("Hobby interest is required"),
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFieldValue: any
  ) => {
    const value = e.target.value;
    setFieldValue("hobby_intrest", value ? value.split(" ") : []);
    const filtered = suggestionsArray.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuggestions(filtered);
  };

  const handleSuggestionClick = (
    suggestion: string,
    setFieldValue: any,
    currentTags: string[]
  ) => {
    if (!currentTags.includes(suggestion)) {
      setFieldValue("hobby_intrest", [...currentTags, suggestion]);
    }
    setFilteredSuggestions([]);
  };

  const handleTagRemove = (
    tag: string,
    setFieldValue: any,
    currentTags: string[]
  ) => {
    setFieldValue(
      "hobby_intrest",
      currentTags.filter((t) => t !== tag)
    );
  };
  const handleSubmit = async (values: FormValues) => {
    const dbValues = {
      marital_status: values.marital_status,
      have_children: values.have_children || false,
      no_of_children: values.no_of_children || 0,
      health_information: values.health_information,
      any_disability: values.any_disability,
      blood_group: values.blood_group,
      describe_disability: values.describe_disability || "",
      hobby_intrest: values.hobby_intrest,
    };
    const { data, error } = await supabase
      .from("about_you_second")
      .upsert([{ ...dbValues, id: user?.id }])
      .select();

    if (data) {
      toast.success("Data saved successfully!");
    }
  };
  return (
    <div className="">
      <Formik
        initialValues={{
          marital_status: "",
          have_children: "",
          no_of_children: "",
          health_information: "",
          any_disability: "",
          blood_group: "",
          describe_disability: "",
          hobby_intrest: [],
        }}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        ref={formikRef}
      >
        {({ values, setFieldValue, isValid, validateForm, errors }) => {
          return (
            <Form className="w-full">
              <TablistWrapper
                isvalidate={isValid}
                validateForm={validateForm}
                values={values}
              >
                <div className="container">
                  <div className="bg-brand-blue50 rounded-lg px-4 em:px-10 lg:px-[64px] py-8 mt-16">
                    <div className="mb-[56px]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mb-8">
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Marital Status
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus-within:ring-blue-700">
                            <Field
                              as="select"
                              name="marital_status"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              <option value="">Select...</option>
                              {Marital_Status?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <ErrorMessage
                            name="marital_status"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Have Children
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                            <Field
                              as="select"
                              name="have_children"
                              className="w-full outline-none text-base text-brand-darkGreen"
                              disabled={
                                values.marital_status === "Never Married"
                              }
                            >
                              <option value="">Select...</option>
                              {Have_children?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                            <ErrorMessage
                              name="have_children"
                              component="div"
                              className="text-sm block mt-2 text-[red] capitalize"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            No of Children
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                            <Field
                              as="select"
                              name="no_of_children"
                              className="w-full outline-none text-base text-brand-darkGreen"
                              disabled={
                                values.have_children === "No" ||
                                values.marital_status === "Never Married"
                              }
                            >
                              <option value="">Select...</option>
                              {No_of_Children?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <ErrorMessage
                            name="no_of_children"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Health Information
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                            <Field
                              as="select"
                              name="health_information"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              <option value="">Select...</option>
                              {Health_Information?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <ErrorMessage
                            name="health_information"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Any Disability?
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                            <Field
                              as="select"
                              name="any_disability"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              <option value="">Select...</option>
                              {Disability?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <ErrorMessage
                            name="any_disability"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Blood Group
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                            <Field
                              as="select"
                              name="blood_group"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              <option value="">Select...</option>
                              {Blood_Group?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                              {/* Add more options as needed */}
                            </Field>
                          </div>
                          <ErrorMessage
                            name="blood_group"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>
                      </div>
                      <div className="mb-8">
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Describe Disability
                        </label>
                        <Field
                          as="textarea"
                          disabled={values.any_disability === "None"}
                          name="describe_disability"
                          className="w-full p-3 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack placeholder:w-full placeholder:max-w-xl resize-none scrollbarHide"
                          rows={2}
                        />
                        <ErrorMessage
                          name="describe_disability"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div className="">
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Hobby & Interest
                        </label>
                        <div className="relative">
                          <Field
                            id="hobby_intrest"
                            className="w-full p-3 border-[1px] border-gray-300 text-base rounded-[6px] placeholder:text-base placeholder:text-gray-500 resize-none scrollbarHide"
                            rows={2}
                            value={
                              Array.isArray(values.hobby_intrest)
                                ? values.hobby_intrest.join(" ")
                                : ""
                            }
                            onChange={(e: any) =>
                              handleChange(e, setFieldValue)
                            }
                          />
                          {filteredSuggestions.length > 0 && (
                            <ul className="absolute z-10 w-full border border-gray-300 bg-white">
                              {filteredSuggestions.map((suggestion, index) => (
                                <li
                                  key={index}
                                  className="p-2 hover:bg-gray-200 cursor-pointer"
                                  onClick={() =>
                                    handleSuggestionClick(
                                      suggestion,
                                      setFieldValue,
                                      values.hobby_intrest
                                    )
                                  }
                                >
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          )}
                          <ErrorMessage
                            name="hobby_intrest"
                            component="div"
                            className="text-sm block mt-2 text-[#1f1b1b] capitalize"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {Array.isArray(values?.hobby_intrest) &&
                            values?.hobby_intrest?.map((tag, index) => (
                              <div
                                key={index}
                                className="bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-600"
                              >
                                {tag}
                                <span
                                  className="ml-2 cursor-pointer"
                                  onClick={() =>
                                    handleTagRemove(
                                      tag,
                                      setFieldValue,
                                      values.hobby_intrest
                                    )
                                  }
                                >
                                  &times;
                                </span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TablistWrapper>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AboutYouFormSecond;
