import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import TablistButtons from "@/components/Tablist/tablistButtons";
import options from "@/store/options.json";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { AcademicForm as AcademicType } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";
import { toast } from "sonner";

const { Education, Subject } = options;

const AcademicForm = () => {
  const supabase = useSupabase();
  const [dbData, setDbData] = useState<AcademicType>();
  const [educationEntries, setEducationEntries] = useState<any[]>([]);
  const [otherSelected, setOtherSelected] = useState<boolean>(false);
  const [subjectValue, setSubjectValue] = useState<string>("");
  const formikRef = useRef<FormikProps<AcademicType>>(null);
  const { user, loading, error } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("academic")
          .select("*")
          .eq("id", user?.id)
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
        education: dbData.education || "",
        subject: dbData.subject || "",
        passout_year: dbData.passout_year || "",
        university_collage: dbData.university_collage || "",
        collage_name: dbData.collage_name || "",
        collage_location: dbData.collage_location || "",
        custom_subject: dbData.custom_subject || "",
        academic_details: dbData.academic_details || [],
      });
      if (dbData.academic_details) {
        setEducationEntries(dbData.academic_details);
      }
    }
  }, [dbData]);

  const validationSchema = Yup.object({
    education: Yup.string().required("Education is required"),
    subject: Yup.string().required("Subject is required"),
    passout_year: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Passout year is required"),
    university_collage: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("University is required"),
    collage_name: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ),
    collage_location: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Location is required"),
  });

  const handleSubmit = async (values: any) => {
    const dbValues = {
      education: values.education,
      subject: values.subject,
      passout_year: values.passout_year,
      university_collage: values.university_collage,
      collage_name: values.collage_name,
      collage_location: values.collage_location,
      custom_subject: values.custom_subject,
      academic_details: educationEntries,
    };
    const { data, error } = await supabase
      .from("academic")
      .upsert([{ ...dbValues, id: user?.id }])
      .select();

    if (data) {
      toast.success('Data saved successfully!')
    }
  };

  const SubjectValue = (e: any, setFieldValue: any) => {
    const value = e.target.value;
    setFieldValue("subject", value);
    if (value === "Other") {
      setOtherSelected(true);
      setSubjectValue("");
    } else {
      setOtherSelected(false);
      setSubjectValue(value);
    }
  };
  const handleAddNewEducation = (values: any) => {
    if (educationEntries.length < 5) {
      const newEntry = {
        education: values.education,
        subject: values.subject,
        passout_year: values.passout_year,
        university_collage: values.university_collage,
        collage_name: values.collage_name,
        collage_location: values.collage_location,
        custom_subject: values.custom_subject || "",
      };

      setEducationEntries((prevEntries) => {
        return [...prevEntries, newEntry];
      });

      formikRef.current?.resetForm();
    } else {
      alert("You can only add up to 5 education entries.");
    }
  };

  const handleEditEducation = (index: number) => {
    const entry = educationEntries[index];
    setEducationEntries((prevEntries) => {
      const newEntries = [...prevEntries];
      newEntries[index] = formikRef.current?.values;
      return newEntries;
    });
    formikRef.current?.setValues({
      education: entry.education,
      subject: entry.subject,
      passout_year: entry.passout_year,
      university_collage: entry.university_collage,
      collage_name: entry.collage_name,
      collage_location: entry.collage_location,
      custom_subject: entry.custom_subject,
      academic_details: []
    });
  };

  const handleDeleteEducation = (index: number) => {
    setEducationEntries((prevEntries) => {
      const newEntries = [...prevEntries];
      newEntries.splice(index, 1);
      return newEntries;
    });
  };

  return (
    <div className="">
      <Formik
        initialValues={{
          education: "",
          subject: "",
          passout_year: "",
          university_collage: "",
          collage_name: "",
          collage_location: "",
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ isValid, setFieldValue, validateForm, values }) => (
          <Form className="">
            <TablistWrapper isvalidate={isValid} validateForm={validateForm} values={values}>
              <div className="container">
                <div className=" bg-brand-blue50 rounded-lg px-4 em:px-10 lg:px-[64px] py-8 mt-16">

                  <div className="mb-[56px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mb-8">
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Education
                        </label>
                        <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                          <Field
                            as="select"
                            name="education"
                            className="w-full outline-none text-base text-brand-darkGreen"
                          >
                            <option value="">Select...</option>
                            {Education?.map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="education"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      {!otherSelected ? (
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Subject
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                            <Field
                              as="select"
                              name="subject"
                              className="w-full outline-none text-base text-brand-darkGreen"
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setFieldValue("subject", e.target.value);
                                SubjectValue(e, setFieldValue);
                              }}
                            >
                              <option value="">Select...</option>
                              {Subject?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <ErrorMessage
                            name="subject"
                            component="div"
                            className="text-red-600"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="bg-white border border-brand-grayBorder rounded-md py-2 px-3 w-full">
                            <Field
                              className="outline-none text-base text-brand-darkGreen"
                              type="text"
                              name="custom_subject"
                              placeholder="Enter custom subject"
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setSubjectValue(e.target.value);
                                setFieldValue("custom_subject", e.target.value);
                              }}
                            />
                            <Field
                              as="select"
                              className="outline-none text-base text-brand-darkGreen"
                              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                setFieldValue("subject", e.target.value);
                                SubjectValue(e, setFieldValue);
                              }}
                            >
                              <option value=""></option>
                              {Subject?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </>
                      )}
                      <div className="">
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Passout Year
                        </label>
                        <Field
                          className="w-full p-2.5 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                          type="text"
                          name="passout_year"
                          placeholder="Type passout year"
                        />
                        <ErrorMessage
                          name="passout_year"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-8">
                      <div className="">
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          University & College
                        </label>
                        <Field
                          className="w-full p-2.5 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                          type="text"
                          name="university_collage"
                          placeholder="Type name of university_collage"
                        />
                        <ErrorMessage
                          name="university_collage"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div className="">
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Specify College or School Name
                        </label>
                        <Field
                          className="w-full p-2.5 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                          type="text"
                          name="collage_name"
                          placeholder="Type if any..."
                        />
                      </div>
                      <div className="">
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Location of University/College/School
                        </label>
                        <Field
                          className="w-full p-2.5 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                          type="text"
                          name="collage_location"
                          placeholder="Type the city, state and country name"
                        />
                        <ErrorMessage
                          name="collage_location"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        type="button"
                        className="bg-brand-darkcyan text-white px-4 py-2 rounded-md mt-6"
                        onClick={() =>
                          handleAddNewEducation(formikRef.current?.values)
                        }
                      >
                        Add New Education
                      </button>
                      <button
                        type="button"
                        className="bg-brand-darkcyan text-white px-4 py-2 rounded-md mt-6"
                        onClick={() =>
                          handleAddNewEducation(formikRef.current?.values)
                        }
                      >
                        Save this Entry
                      </button>
                    </div>
                    {educationEntries.length > 0 && (
                      <div className="mt-8">
                        <h3 className="text-xl font-medium mb-4">
                          Added Education Entries
                        </h3>
                        <table className="w-full border-collapse">
                          <thead>
                            <tr>
                              <th className="border px-4 py-2">Education</th>
                              <th className="border px-4 py-2">Subject</th>
                              <th className="border px-4 py-2">Passout Year</th>
                              <th className="border px-4 py-2">University</th>
                              <th className="border px-4 py-2">College</th>
                              <th className="border px-4 py-2">Location</th>
                              <th className="border px-4 py-2">Custom Subject</th>
                              <th className="border px-4 py-2">Operations</th>
                            </tr>
                          </thead>
                          <tbody>
                            {educationEntries?.map((entry, index) => (
                              <tr key={index}>
                                <td className="border px-4 py-2">
                                  {entry.education}
                                </td>
                                <td className="border px-4 py-2">{entry.subject}</td>
                                <td className="border px-4 py-2">
                                  {entry.passout_year}
                                </td>
                                <td className="border px-4 py-2">
                                  {entry.university_collage}
                                </td>
                                <td className="border px-4 py-2">{entry.collage_name}</td>
                                <td className="border px-4 py-2">{entry.collage_location}</td>
                                <td className="border px-4 py-2">
                                  {entry.custom_subject}
                                </td>
                                <td className="border px-4 py-2 flex justify-between">
                                  <svg
                                    onClick={() => handleEditEducation(index)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 50 50"
                                  >
                                    <path d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z"></path>
                                  </svg>
                                  <svg
                                    onClick={() => handleDeleteEducation(index)}
                                    xmlns="http://www.w3.org/2000/svg"
                                    x="0px"
                                    y="0px"
                                    width="25"
                                    height="25"
                                    viewBox="0 0 24 24"
                                  >
                                    <path d="M 10.806641 2 C 10.289641 2 9.7956875 2.2043125 9.4296875 2.5703125 L 9 3 L 4 3 A 1.0001 1.0001 0 1 0 4 5 L 20 5 A 1.0001 1.0001 0 1 0 20 3 L 15 3 L 14.570312 2.5703125 C 14.205312 2.2043125 13.710359 2 13.193359 2 L 10.806641 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z"></path>
                                  </svg>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TablistWrapper>
            {/* <TablistButtons
              isvalidate={isValid}
            /> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AcademicForm;
