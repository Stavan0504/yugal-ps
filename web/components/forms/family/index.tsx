import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import TablistButtons from "@/components/Tablist/tablistButtons";
import options from "@/store/options.json";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { FamilyForm as FamilyType } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";
import { toast } from "sonner";

const { Family_Type, Family_Value, currencies } = options;

const FamilyForm = () => {
  const supabase = useSupabase();
  const [dbData, setDbData] = useState<FamilyType>();
  const formikRef = useRef<FormikProps<FamilyType>>(null);
  const { user, loading, error } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const { data } = await supabase
          .from("family")
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
        father_name: dbData.father_name || "",
        father_contact_no: dbData.father_contact_no || 0,
        father_status: dbData.father_status || "",
        father_annual_income: dbData.father_annual_income || 0,
        father_income_currency: dbData.father_income_currency || "INR",
        mother_name: dbData.mother_name || "",
        mother_contact_no: dbData.mother_contact_no || 0,
        mother_status: dbData.mother_status || "",
        mother_annual_income: dbData.mother_annual_income || 0,
        mother_income_currency: dbData.mother_income_currency || "INR",
        family_type: dbData.family_type || "",
        family_value: dbData.family_value || "",
        about_family: dbData.about_family || "",
        married_brothers: dbData.married_brothers || 0,
        Unmarried_brothers: dbData.Unmarried_brothers || 0,
        married_sister: dbData.married_sister || 0,
        Unmarried_sisters: dbData.Unmarried_sisters || 0,
      });
    }
  }, [dbData]);

  const validationSchema = Yup.object({
    father_name: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Father name is required"),
    father_contact_no: Yup.string().required("Father contact is required").matches(/^[0-9]{10}$/, "Invalid phone number"),
    father_status: Yup.string().required("Father status is required"),
    father_annual_income: Yup.number()
      .when("father_status", {
        is: "Unemployed",
        then: (s) => s.notRequired(),
        otherwise: (s) => s.required("Father income is required"),
      })
      .positive()
      .integer(),
    mother_name: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Mother name is required"),
    mother_contact_no: Yup.string().required("Mother contact is required").matches(/^[0-9]{10}$/, "Invalid phone number"),
    mother_status: Yup.string().required("Mother status is required"),
    mother_annual_income: Yup.number()
      .when("mother_status", {
        is: "Unemployed",
        then: (s) => s.notRequired(),
        otherwise: (s) => s.required("Mother income is required"),
      })
      .positive()
      .integer(),
    family_type: Yup.string().required("Family type is required"),
    family_value: Yup.string().required("Family value is required"),
    about_family: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("About family is required"),
    married_brothers: Yup.number().min(0)
      .required("Married brothers count is required"),
    Unmarried_brothers: Yup.number().min(0)
      .required("Unmarried brothers count is required"),
    married_sister: Yup.number().min(0)
      .required("Married sisters count is required"),
    Unmarried_sisters: Yup.number().min(0)
      .required("Unmarried sisters count is required"),
  });

  const handleSubmit = async (values: any) => {
    const dbValues = {
      father_name: values.father_name,
      father_contact_no: values.father_contact_no,
      father_status: values.father_status,
      father_annual_income: values.father_annual_income,
      father_income_currency: values.father_income_currency,
      mother_name: values.mother_name,
      mother_contact_no: values.mother_contact_no,
      mother_status: values.mother_status,
      mother_annual_income: values.mother_annual_income,
      mother_income_currency: values.mother_income_currency,
      family_type: values.family_type,
      family_value: values.family_value,
      about_family: values.about_family,
      married_brothers: values.married_brothers,
      Unmarried_brothers: values.Unmarried_brothers,
      married_sister: values.married_sister,
      Unmarried_sisters: values.Unmarried_sisters,
    };
    const { data, error } = await supabase
      .from("family")
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
          father_name: "",
          father_contact_no: "",
          father_status: "",
          father_annual_income: 0,
          father_income_currency: "INR",
          mother_name: "",
          mother_contact_no: "",
          mother_status: "",
          mother_annual_income: 0,
          mother_income_currency: "INR",
          family_type: "",
          family_value: "",
          about_family: "",
          married_brothers: 0,
          Unmarried_brothers: 0,
          married_sister: 0,
          Unmarried_sisters: 0,
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ values, setFieldValue, isValid, validateForm }) => (
          <Form className=" ">
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
                          Father’s Name
                        </label>
                        <Field
                          type="text"
                          name="father_name"
                          placeholder="Name"
                          className="w-full p-2  border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                        />
                        <ErrorMessage
                          name="father_name"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Contact No.
                        </label>
                        <Field
                          type="number"
                          name="father_contact_no"
                          placeholder="Mobile No"
                          className="w-full p-2  border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                        />
                        <ErrorMessage
                          name="father_contact_no"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Father’s Status
                        </label>
                        <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                          <Field
                            as="select"
                            name="father_status"
                            onChange={(e: any) => {
                              const { value } = e.target;
                              setFieldValue("father_status", value);
                              if (value === "Unemployed") {
                                setFieldValue("father_annual_income", null);
                              }
                            }}
                            className="w-full outline-none text-base text-brand-darkGreen"
                          >
                            <option value="">Select...</option>
                            <option value="Employed">Employed</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="Retired">Retired</option>
                          </Field>
                        </div>
                        <ErrorMessage
                          name="father_status"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div className="flex em:flex-row flex-col items-start gap-2">
                        <div className="w-full">
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Annual Income
                          </label>
                          <Field
                            type="number"
                            disabled={values.father_status === "Unemployed"}
                            name="father_annual_income"
                            placeholder="Amount"
                            className="w-full p-2  border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                          />
                          <ErrorMessage
                            name="father_annual_income"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>
                        <div className="w-full">
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 em:mt-9 ">
                            <Field
                              as="select"
                              name="father_income_currency"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              {currencies?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Mother’s Name
                        </label>
                        <Field
                          type="text"
                          name="mother_name"
                          placeholder="Name"
                          className="w-full p-2  border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                        />
                        <ErrorMessage
                          name="mother_name"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Contact No.
                        </label>
                        <Field
                          type="number"
                          name="mother_contact_no"
                          placeholder="Mobile No"
                          className="w-full p-2  border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                        />
                        <ErrorMessage
                          name="mother_contact_no"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Mother’s Status
                        </label>
                        <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                          <Field
                            as="select"
                            name="mother_status"
                            onChange={(e: any) => {
                              const { value } = e.target;
                              setFieldValue("mother_status", value);
                              if (value === "Unemployed") {
                                setFieldValue("mother_annual_income", null);
                              }
                            }}
                            className="w-full outline-none text-base text-brand-darkGreen"
                          >
                            <option value="">Select...</option>
                            <option value="Employed">Employed</option>
                            <option value="Unemployed">Unemployed</option>
                            <option value="HouseWife">HouseWife</option>
                          </Field>
                        </div>
                        <ErrorMessage
                          name="mother_status"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div className="flex em:flex-row flex-col items-start gap-2">
                        <div className="w-full">
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Annual Income
                          </label>
                          <Field
                            type="number"
                            disabled={values.mother_status === "Unemployed"}
                            name="mother_annual_income"
                            placeholder="Amount"
                            className="w-full p-2  border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                          />
                          <ErrorMessage
                            name="mother_annual_income"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>
                        <div className="w-full">
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 em:mt-9">
                            <Field
                              as="select"
                              name="mother_income_currency"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              {currencies?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Brother
                        </label>
                        <div className="flex items-center mt-4 gap-4">
                          <div className="w-full">
                            <Field
                              type="number"
                              name="married_brothers"
                              // value={values.marriedBrothers}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setFieldValue(
                                  "married_brothers",
                                  parseInt(e.target.value, 10) || 0
                                )
                              }
                              className="block bg-white border border-brand-grayBorder rounded-md py-1 px-3 mt-2 w-full"
                            />
                            <label className="flex justify-center items-center py-1 px-1 mt-2">Married</label>
                          </div>
                          <div className="w-full">
                            <Field
                              type="number"
                              name="Unmarried_brothers"
                              // value={values.unmarriedBrothers}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setFieldValue(
                                  "Unmarried_brothers",
                                  parseInt(e.target.value, 10) || 0
                                )
                              }
                              className="block bg-white border border-brand-grayBorder rounded-md py-1 px-3 mt-2 w-full"
                            />
                            <label className="flex justify-center items-center py-1 px-1 mt-2">Unmarried</label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Sister
                        </label>
                        <div className="flex items-center mt-4 gap-4">
                          <div className="w-full">
                            <Field
                              type="number"
                              name="married_sister"
                              // value={values.marriedSisters}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setFieldValue(
                                  "married_sister",
                                  parseInt(e.target.value, 10) || 0
                                )
                              }
                              className="block bg-white border border-brand-grayBorder rounded-md py-1 px-3 mt-2 w-full"
                            />
                            <label className="flex justify-center items-center py-1 px-1 mt-2">Married</label>
                          </div>
                          <div className="w-full">
                            <Field
                              type="number"
                              name="Unmarried_sisters"
                              // value={values.unmarriedSisters}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) =>
                                setFieldValue(
                                  "Unmarried_sisters",
                                  parseInt(e.target.value, 10) || 0
                                )
                              }
                              className="block bg-white border border-brand-grayBorder rounded-md py-1 px-3 mt-2 w-full"
                            />
                            <label className="flex justify-center items-center py-1 px-1 mt-2">Unmarried</label>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Family Type
                        </label>
                        <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                          <Field
                            as="select"
                            name="family_type"
                            className="w-full outline-none text-base text-brand-darkGreen"
                          >
                            <option value="">Select...</option>
                            {Family_Type?.map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="family_type"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-4">
                          Family Value
                        </label>
                        <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                          <Field
                            as="select"
                            name="family_value"
                            className="w-full outline-none text-base text-brand-darkGreen"
                          >
                            <option value="">Select...</option>
                            {Family_Value?.map((i) => (
                              <option key={i} value={i}>
                                {i}
                              </option>
                            ))}
                          </Field>
                        </div>
                        <ErrorMessage
                          name="family_value"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        About my family
                      </label>
                      <Field
                        as="textarea"
                        name="about_family"
                        rows={3}
                        className="w-full p-3 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack placeholder:w-full placeholder:max-w-xl resize-none scrollbarHide"
                      />
                      <ErrorMessage
                        name="about_family"
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

export default FamilyForm;
