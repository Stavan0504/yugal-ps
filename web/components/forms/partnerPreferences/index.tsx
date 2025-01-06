import React, { useEffect, useRef, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import options from "@/store/options.json";
import { useRouter } from "next/navigation";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { PartnerPreferencesForm as PartnerPrefereceType } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";
import { toast } from "sonner";

const { Marital_Status, Smoking, Alcohole } = options;

const PartnerPreferencesForm = () => {
  const validationSchema = Yup.object({
    min_weight: Yup.string().required("Min weight is required"),
    max_weight: Yup.string().required("Max weight is required"),
    min_birth_year: Yup.string().required("Min BirthYear is required"),
    max_birth_year: Yup.string().required("Max birthYear is required"),
    min_height: Yup.string().required("Min height is required"),
    max_height: Yup.string().required("Min height is required"),
    marital_status: Yup.string().required("Marital status is required"),
    smoking: Yup.string().required("Smoking is required"),
    alcohol: Yup.string().required("Alcohol is required"),
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = useSupabase();
  const [dbData, setDbData] = useState<PartnerPrefereceType>();
  const formikRef = useRef<FormikProps<PartnerPrefereceType>>(null);
  const { user, loading, error } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("partner_preferences")
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
        min_weight: dbData.min_weight || "",
        max_weight: dbData.max_weight || "",
        min_birth_year: dbData.min_birth_year || "",
        max_birth_year: dbData.max_birth_year || "",
        min_height: dbData.min_height || "",
        max_height: dbData.max_height || "",
        marital_status: dbData.marital_status || "",
        smoking: dbData.smoking || "",
        alcohol: dbData.alcohol || "",
      });
    }
  }, [dbData]);

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const dbValues = {
        min_weight: values.min_weight,
        max_weight: values.max_weight,
        min_birth_year: values.min_birth_year,
        max_birth_year: values.max_birth_year,
        min_height: values.min_height,
        max_height: values.max_height,
        marital_status: values.marital_status,
        smoking: values.smoking,
        alcohol: values.alcohol,
      };
      const { data, error } = await supabase
        .from("partner_preferences")
        .upsert([{ ...dbValues, id: user?.id }])
        .select();

      if (data) {
        toast.success('Data saved successfully!')
      }
    } catch (error) {
      return console.error("Error submitting form:", error);
    } finally {
      router.push("/thank-you");
      setIsLoading(false);
    }

    // try {
    //   const response = await axios.post(`/api/allFormSubmit`, allFormData);
    //   console.log(allFormData, "ok");
    // } catch (error) {
    //   return console.error("Error submitting form:", error);
    // } finally {
    //   router.push("/thank-you");
    // }
  };

  return (
    <div className="">
      {isLoading ? (
        <div className="load"></div>
      ) : (
        <Formik
          initialValues={{
            min_weight: "",
            max_weight: "",
            min_birth_year: "",
            max_birth_year: "",
            min_height: "",
            max_height: "",
            marital_status: "",
            smoking: "",
            alcohol: "",
          }}
          validationSchema={validationSchema}
          validateOnMount={true}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={true}
          innerRef={formikRef}
        >
          {({ setFieldValue, isValid, validateForm, values }) => (
            <Form className=" ">
              <TablistWrapper isvalidate={isValid} validateForm={validateForm} values={values}>
                <div className="container">
                  <div className="bg-brand-blue50 rounded-lg px-4 em:px-10 lg:px-[64px] py-8 mt-16">

                    <div className="mb-[56px]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mb-8">
                        {/* Weight Selection */}
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Weight
                          </label>
                          <div className="flex lg:flex-row flex-col items-center gap-2 lg:gap-4">
                            <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                              <Field
                                as="select"
                                name="min_weight"
                                className="w-full outline-none text-base text-brand-darkGreen"
                              >
                                <option value="">Select Weight</option>
                                <option value="50Kg">50Kg</option>
                                <option value="60Kg">60Kg</option>
                                <option value="70Kg">70Kg</option>
                                <option value="80Kg">80Kg</option>
                              </Field>
                            </div>
                            <span className="text-base text-brand-lightBlack font-medium">
                              to
                            </span>
                            <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                              <Field
                                as="select"
                                name="max_weight"
                                className="w-full outline-none text-base text-brand-darkGreen"
                              >
                                <option value="">Select Weight</option>
                                <option value="70Kg">70Kg</option>
                                <option value="80Kg">80Kg</option>
                                <option value="90Kg">90Kg</option>
                              </Field>
                            </div>
                          </div>
                          <ErrorMessage
                            name="weight"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>

                        {/* Birth Year Selection */}
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Birth Year
                          </label>
                          <div className="flex lg:flex-row flex-col items-center gap-2 lg:gap-4">
                            <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                              <Field
                                as="select"
                                name="min_birth_year"
                                className="w-full outline-none text-base text-brand-darkGreen"
                              >
                                <option value="">Select Year</option>
                                <option value="1990">1990</option>
                                <option value="1995">1995</option>
                                <option value="2000">2000</option>
                                <option value="2005">2005</option>
                              </Field>
                            </div>
                            <span className="text-base text-brand-lightBlack font-medium">
                              to
                            </span>
                            <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                              <Field
                                as="select"
                                name="max_birth_year"
                                className="w-full outline-none text-base text-brand-darkGreen"
                              >
                                <option value="">Select Year</option>
                                <option value="1990">1990</option>
                                <option value="1995">1995</option>
                                <option value="2000">2000</option>
                                <option value="2005">2005</option>
                              </Field>
                            </div>
                          </div>
                          <ErrorMessage
                            name="birthYear"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>

                        {/* Height Selection */}
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Height
                          </label>
                          <div className="flex lg:flex-row flex-col items-center gap-2 lg:gap-4">
                            <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                              <Field
                                as="select"
                                name="min_height"
                                className="w-full outline-none text-base text-brand-darkGreen"
                              >
                                <option value="">Select Height</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                              </Field>
                            </div>
                            <span className="text-base text-brand-lightBlack font-medium">
                              to
                            </span>
                            <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                              <Field
                                as="select"
                                name="max_height"
                                className="w-full outline-none text-base text-brand-darkGreen"
                              >
                                <option value="">Select Height</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                              </Field>
                            </div>
                          </div>
                          <ErrorMessage
                            name="height"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>

                        {/* Marital Status Selection */}
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Marital Status
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                            <Field
                              as="select"
                              name="marital_status"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              <option value="">Select Status</option>
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

                        {/* Smoking Selection */}
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Smoking
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                            <Field
                              as="select"
                              name="smoking"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              <option value="">Select Option</option>
                              {Smoking?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <ErrorMessage
                            name="smoking"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
                        </div>

                        {/* Alcohol Selection */}
                        <div>
                          <label className="block text-black text-xl leading-5 font-medium mb-4">
                            Alcohol
                          </label>
                          <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                            <Field
                              as="select"
                              name="alcohol"
                              className="w-full outline-none text-base text-brand-darkGreen"
                            >
                              <option value="">Select Option</option>
                              {Alcohole?.map((i) => (
                                <option key={i} value={i}>
                                  {i}
                                </option>
                              ))}
                            </Field>
                          </div>
                          <ErrorMessage
                            name="alcohol"
                            component="div"
                            className="text-sm block mt-2 text-[red] capitalize"
                          />
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
      )}
    </div>
  );
};

export default PartnerPreferencesForm;
