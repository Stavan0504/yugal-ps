import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikProps } from "formik";
import * as Yup from "yup";
import TablistButtons from "@/components/Tablist/tablistButtons";
import options from "@/store/options.json";
import { useFormStore } from "@/store/formStore";
import Image from "next/image";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { uploadImages } from "@/lib/fileuploader";
import FileUpload from "@/components/ui/upload";
import { LifeStyleForm as LifeStyleType } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";
import { toast } from "sonner";

const { Diet, Smoking, Alcohole } = options;

// types.ts (or in a relevant file for your form types)

export interface FormValues {
  diet_type: string;
  smoking: string;
  alcohol: string;
  passport_pic: string;
  full_pic: string;
  additional_one: string;
  additional_two: string;
}

const LifeStyleForm = () => {
  const { lifeStyleForm, setLifeStyleForm, setInitialFiles } =
    useFormStore();
  const supabase = useSupabase();
  const [dbData, setDbData] = useState<typeof lifeStyleForm | null>(null);
  const formikRef = useRef<FormikProps<LifeStyleType>>(null);
  const { user, loading, error } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("life_style")
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
        diet_type: dbData.diet_type || "",
        smoking: dbData.smoking || "",
        alcohol: dbData.alcohol || "",
        passport_pic: dbData.passport_pic || "",
        full_pic: dbData.full_pic || "",
        additional_one: dbData.additional_one || "",
        additional_two: dbData.additional_two || "",
      });
    }
  }, [dbData]);

  // useEffect(() => {
  //   setFiles(initialFiles);
  // }, [initialFiles]);

  const validationSchema = Yup.object({
    diet_type: Yup.string().required("Diet type is required"),
    smoking: Yup.string().required("Smoking is required"),
    alcohol: Yup.string().required("Alcohol is required"),
    passport_pic: Yup.string().required("Passport Photo is required"),
    full_pic: Yup.string().required("Full pic is required"),
    additional_one: Yup.string(),
    additional_two: Yup.string(),
  });

  const handleSubmit = async (values: any) => {
    const sanityformData = {
      diet_type: values.diet_type,
      smoking: values.smoking,
      alcohol: values.alcohol,
      passport_pic: values.passport_pic || null,
      full_pic: values.full_pic || null,
      additional_one: values.additional_one || null,
      additional_two: values.additional_two || null,
    };
    const { data, error } = await supabase
      .from("life_style")
      .upsert([{ ...sanityformData, id: user?.id }])
      .select();

    if (data) {
      toast.success('Data saved successfully!')
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void,
    fieldName: string,
    setImageState: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const file = event.target.files?.[0] || null;
    setImageState(file);
    setFieldValue(fieldName, file);
  };

  // const handleFileRemove = (
  //   fileToRemove: File,
  //   setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  // ) => {
  //   const updatedFiles = files.filter((file) => file !== fileToRemove);
  //   setFiles(updatedFiles);
  //   setFieldValue("files", updatedFiles);
  // };

  return (
    <div className="">
      <Formik
        initialValues={{
          diet_type: "",
          smoking: "",
          alcohol: "",
          passport_pic: "",
          full_pic: "",
          additional_one: "",
          additional_two: "",
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ setFieldValue, isValid, validateForm, values }) => (
          <Form className=" ">
            <TablistWrapper isvalidate={isValid} validateForm={validateForm} values={values} >
              <div className="container">
                <div className="bg-brand-blue50 rounded-lg px-4 em:px-10 lg:px-[64px] py-8 mt-16">
                  <div className="mb-[56px] grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8">
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Diet type
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="diet_type"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select...</option>
                          {Diet?.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="dietType"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>
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
                          <option value="">Select...</option>
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
                          <option value="">Select...</option>
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
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Passport Photo
                      </label>
                      <FileUpload
                        onFileSelect={(url) => {
                          setFieldValue("passport_pic", url);
                        }}
                        url={dbData?.passport_pic}
                      />
                      <ErrorMessage
                        name="passport_pic"
                        component="div"
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Full Photo
                      </label>
                      <FileUpload
                        onFileSelect={(url) => {
                          setFieldValue("full_pic", url);
                        }}
                        url={dbData?.full_pic}
                      />
                      <ErrorMessage
                        name="full_pic"
                        component="div"
                        className="text-red-600"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Additional Photo 1
                      </label>
                      <FileUpload
                        onFileSelect={(url) => {
                          setFieldValue("additional_one", url);
                        }}
                        url={dbData?.additional_one}
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Additional Photo 2
                      </label>
                      <FileUpload
                        onFileSelect={(url) => {
                          setFieldValue("additional_two", url);
                        }}
                        url={dbData?.additional_two}
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

export default LifeStyleForm;
