import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import TablistButtons from "@/components/Tablist/tablistButtons";
import options from "@/store/options.json";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { CareerForm as Careertype } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";
import { toast } from "sonner";

const { Working_with, Occupations, currencies, Working_Type } = options;

const CareerForm = () => {
  const supabase = useSupabase();
  const [dbData, setDbData] = useState<Careertype>();
  const formikRef = useRef<FormikProps<Careertype>>(null);
  const { user, loading, error } = useUser();


  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("career")
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
        working_with: dbData.working_with || "",
        occupation: dbData.occupation || "",
        employer_name: dbData.employer_name || "",
        working_type: dbData.working_type || "",
        work_location: dbData.work_location || "",
        annual_income: dbData.annual_income || 0,
        currency: dbData.currency || "INR",
      });
    }
  }, [dbData]);

  const validationSchema = Yup.object({
    working_with: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Working with is required"),
    occupation: Yup.string().required("Occupation is required"),
    employer_name: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Employer name is required"),
    working_type: Yup.string().required("Working type is required"),
    work_location: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Work location is required"),
    annual_income: Yup.number()
      .required("Annual income is required")
      .positive()
      .integer(),
  });

  const handleSubmit = async (values: any) => {
    const dbValues = {
      working_with: values.working_with,
      occupation: values.occupation,
      employer_name: values.employer_name,
      working_type: values.working_type,
      work_location: values.work_location,
      annual_income: values.annual_income,
      currency: values.currency,
    };
    const { data, error } = await supabase
      .from("career")
      .upsert([{ ...dbValues, id: user?.id }])
      .select();

    if (data) {
      toast.success('Data saved successfully!')
    }
  };
  return (
    <div className="">
      <Formik
        initialValues={{
          rkingWith: "",
          occupation: "",
          employer_name: "",
          working_type: "",
          work_location: "",
          annual_income: "",
          currency: "INR",
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ isValid, setFieldValue, setValues, values, validateForm }) => (
          <Form className="">
            <TablistWrapper isvalidate={isValid} validateForm={validateForm} values={values}>
              <div className="container">
                <div className=" bg-brand-blue50 rounded-lg px-4 em:px-10 lg:px-[64px] py-8 mt-16">

                  <div className="mb-[56px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mb-8">
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Working with
                        </label>
                        <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                          <Field
                            as="select"
                            name="working_with"
                            className="w-full outline-none text-base text-brand-darkGreen"
                          >
                            <option value="">Select...</option>
                            {Working_with?.map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="working_with"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>

                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Occupation
                        </label>
                        <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                          <Field
                            as="select"
                            name="occupation"
                            className="w-full outline-none text-base text-brand-darkGreen"
                          >
                            <option value="">Select...</option>
                            {Occupations?.map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="occupation"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>

                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Company Name
                        </label>

                        <Field
                          className="w-full p-2.5 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                          type="text"
                          name="employer_name"
                          placeholder="Type company name"
                        />
                        <ErrorMessage
                          name="employer_name"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>

                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Working Type
                        </label>
                        <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3">
                          <Field
                            as="select"
                            name="working_type"
                            className="w-full outline-none text-base text-brand-darkGreen"
                          >
                            <option value="">Select...</option>
                            {Working_Type?.map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="working_type"
                          component="div"
                          className="text-red-600"
                        />
                      </div>

                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Work Location
                        </label>
                        <Field
                          className="w-full p-2.5 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                          type="text"
                          name="work_location"
                          placeholder="Type the city, state and country name"
                        />
                        <ErrorMessage
                          name="work_location"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>

                      <div className="flex em:flex-row flex-col items-start">
                        <div className="w-full max-w-full md:max-w-[251px]">
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Annual Income
                          </label>
                          <Field
                            type="number"
                            className="w-full p-2.5 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                            name="annual_income"
                          />
                          <ErrorMessage
                            name="annual_income"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>
                        <div className=" em:ml-4 w-full max-w-full md:max-w-[251px]">
                          <label className="block  mb-9"></label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2.5 px-3 ">
                            <Field
                              as="select"
                              name="currency"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              <option value="INR">INR</option>
                              {/* Add more currency options as needed */}
                              {currencies?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default CareerForm;
