import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import TablistButtons from "@/components/Tablist/tablistButtons";
import options from "@/store/options.json";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { ReligiousForm as ReligiousType } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";

const { Religion, Mother_Tongue, Community, Sub_Community, Gothra } = options;

const ReligiousForm = () => {
  const supabase = useSupabase();
  const [dbData, setDbData] = useState<ReligiousType>();
  const formikRef = useRef<FormikProps<ReligiousType>>(null);
  const { user, loading, error } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("religious")
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
        religion: dbData.religion || "",
        mother_tongue: dbData.mother_tongue || "",
        community: dbData.community || "",
        sub_community: dbData.sub_community || "",
        gothra: dbData.gothra || "",
      });
    }
  }, [dbData]);

  const validationSchema = Yup.object({
    religion: Yup.string().required("Religion is required"),
    mother_tongue: Yup.string().required("Mother Tongue is required"),
    community: Yup.string().required("Community is required"),
    sub_community: Yup.string()
      .required("Sub Community is required")
      .max(25, "Not more than 25 Character"),
    gothra: Yup.string().required("Gothra is required"),
  });

  const handleSubmit = async (values: any) => {
    const dbValues = {
      religion: values.religion,
      mother_tongue: values.mother_tongue,
      community: values.community,
      sub_community: values.sub_community,
      gothra: values.gothra,
    };
    const { data, error } = await supabase
      .from("religious")
      .upsert([{ ...dbValues, id: user?.id }])
      .select();
  };
  return (
    <div className="">
      <Formik
        initialValues={{
          religion: "",
          mother_tongue: "",
          community: "",
          sub_community: "",
          gothra: "",
        }}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ isValid, handleChange, values, validateForm }) => (
          <Form className=" ">

            <TablistWrapper isvalidate={isValid} validateForm={validateForm} values={values}>
              <div className="container">


                <div className="bg-brand-blue50 rounded-lg px-4 em:px-10 lg:px-[64px] py-8 mt-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mb-[56px]">
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Religion
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="religion"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select Religion</option>
                          {Religion?.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="religion"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Mother Tongue
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="mother_tongue"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select Mother Tongue</option>
                          {Mother_Tongue?.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="mother_tongue"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Community
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="community"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select Community</option>
                          {Community?.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="community"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Sub Community
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          type="text"
                          name="sub_community"
                          className="w-full outline-none text-base text-brand-darkGreen"
                          placeholder="Enter your Sub Community"
                        />
                      </div>
                      <ErrorMessage
                        name="sub_community"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Gothra / Gothram
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="gothra"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select Gothra</option>
                          {Gothra?.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="gothra"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
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

export default ReligiousForm;
