import React, { useEffect, useRef, useState } from "react";
import { createClient } from "@/utils/auth-helpers/client";
import useSupabase from "@/utils/hooks/useSupabase";
import * as Yup from "yup";
import { toast } from "sonner";
import {
  useFormik,
  Field,
  Form,
  ErrorMessage,
  Formik,
  FormikProps,
} from "formik";
import { useFormStore } from "@/store/formStore";
import options from "@/store/options.json";
import TablistButtons from "@/components/Tablist/tablistButtons";
import useUser from "@/utils/hooks/useUser";
import { ContactForm } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";

const validationSchema = Yup.object({
  profile_for: Yup.string().required("Required"),
  candidate_name: Yup.string().test(
    'no-html-tags',
    'HTML tags or scripts are not allowed',
    (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as any)
  ).required("Name is required"),
  candidate_email: Yup.string()
    .email("Invalid email format").test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as any)
    )
    .required("Email is required"),
  candidiate_mobile: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid mobile number").test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as any)
    )
    .required("Mobile number is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters").test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as any)
    )
    .required("Password is required"),
  retypePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match").test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as any)
    )
    .required("Password is required"),
  terms: Yup.boolean().oneOf(
    [true],
    "You must accept the terms and conditions"
  ),
  offers: Yup.boolean(),
});

const ContactDetail = () => {
  const supabase = useSupabase();
  const [isvalidate, setIsvalidate] = useState(false);
  const [dbContactData, setDbContactData] = useState<ContactForm>();
  const { profileOptions } = options;
  const formikRef = useRef<FormikProps<ContactForm>>(null);
  const { user, loading, error } = useUser();

  useEffect(() => {
    const fetchContactData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("contact")
          .select("*")
          .eq("id", user?.id)
          .single();

        if (error) {
          console.log("Error fetching contact data:", error);
        } else {
          setDbContactData(data);
        }
      }
    };

    fetchContactData();
  }, [user, supabase]);

  useEffect(() => {
    if (dbContactData && formikRef.current) {
      formikRef.current.setValues({
        profile_for: dbContactData?.profile_for || "",
        candidate_name: dbContactData?.candidate_name || "",
        candidate_email: dbContactData?.candidate_email || "",
        candidiate_mobile: dbContactData?.candidiate_mobile || "",
        password: "",
        retypePassword: "",
        terms: false,
        offers: false,
      });
    }
  }, [dbContactData]);

  return (
    <Formik
      initialValues={{
        profile_for: dbContactData?.profile_for || "",
        candidate_name: dbContactData?.candidate_name || "",
        candidate_email: dbContactData?.candidate_email || "",
        candidiate_mobile: dbContactData?.candidiate_mobile || "",
        password: "",
        retypePassword: "",
        terms: false,
        offers: false,
      }}
      validateOnMount={true}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const dbValues = {
          profile_for: values.profile_for,
          candidate_name: values.candidate_name,
          candidate_email: values.candidate_email,
          candidiate_mobile: values.candidiate_mobile,
        };
        const { data, error } = await supabase
          .from("contact")
          .upsert([{ ...dbValues, id: user?.id }])
          .select();

        if (data) {
          toast.success("Data saved successfully!");
        }
      }}
      validateOnChange={true}
      validateOnBlur={true}
      innerRef={formikRef}
    >
      {({ isValid, dirty, validateForm, values }) => (
        <Form className="w-full">
          <TablistWrapper
            isvalidate={isValid}
            validateForm={validateForm}
            values={values}
          >
            <div className="container">
              <div className=" bg-brand-blue50 rounded-t-lg  px-4 em:px-10 lg:px-[64px] pb-2 pt-8 w-full mt-16">
                <h2 className="text-xl font-medium mb-4">
                  This Profile is for
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-8 w-full">
                  {profileOptions?.map((option) => (
                    <label key={option} className="flex items-center">
                      <Field
                        type="radio"
                        name="profile_for"
                        value={option}
                        className="mr-2"
                      />
                      <span className="font-inter text-sm em:text-base text-[#2F2F2F]">
                        {option}
                      </span>
                    </label>
                  ))}
                  <ErrorMessage
                    name="profile_for"
                    component="div"
                    className="text-sm block mt-2 text-[red] capitalize"
                  />
                </div>

                <h2 className="block text-black text-xl leading-5 font-medium mb-6">
                  Enter Candidate Detail
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 em:gap-8 mb-6">
                  <div>
                    <label className="text-sm text-brand-darkGreen block font-medium mb-2">
                      Name
                    </label>
                    <Field
                      type="text"
                      name="candidate_name"
                      placeholder="Only name"
                      className="w-full p-3 border-[1px] border-brand-grayBorder  rounded-[6px] placeholder:!text-base placeholder:text-brand-oppla"
                    />
                    <ErrorMessage
                      name="candidate_name"
                      component="div"
                      className="text-sm block mt-2 text-[red] capitalize"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-brand-darkGreen block font-medium mb-2">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="candidate_email"
                      placeholder="@Email ID"
                      className="w-full p-3 border-[1px] border-brand-grayBorder  rounded-[6px] placeholder:!text-base placeholder:text-brand-oppla"
                    />
                    <ErrorMessage
                      name="candidate_email"
                      component="div"
                      className="text-sm block mt-2 text-[red] capitalize"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-brand-darkGreen block font-medium mb-2">
                      Mobile Number
                    </label>
                    <Field
                      type="text"
                      name="candidiate_mobile"
                      placeholder="+911234567898"
                      className="w-full p-3 border-[1px] border-brand-grayBorder  rounded-[6px] placeholder:!text-base placeholder:text-brand-oppla"
                    />
                    <ErrorMessage
                      name="candidiate_mobile"
                      component="div"
                      className="text-sm block mt-2 text-[red] capitalize"
                    />
                  </div>
                </div>

                <h2 className="text-xl font-medium mb-6 ">Enter Password</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="text-sm text-brand-darkGreen block font-medium mb-2">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      placeholder="123456"
                      className="w-full p-3 border-[1px] border-brand-grayBorder  rounded-[6px] placeholder:!text-base placeholder:text-brand-oppla"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-sm block mt-2 text-[red] capitalize"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-brand-darkGreen block font-medium mb-2">
                      Retype Password
                    </label>
                    <Field
                      type="password"
                      name="retypePassword"
                      placeholder="123456"
                      className="w-full p-3 border-[1px] border-brand-grayBorder  rounded-[6px] placeholder:!text-base placeholder:text-brand-oppla"
                    />
                    <ErrorMessage
                      name="retypePassword"
                      component="div"
                      className="text-sm block mt-2 text-[red] capitalize"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center">
                    <Field type="checkbox" name="terms" className="mr-2" />
                    <span className="text-base font-bold text-brand-darkcyan cursor-pointer select-none">
                      I agree to the
                      <span className="text-[#8c8c8c] ">
                        Terms & Conditions{" "}
                        <span className="text-brand-darkcyan">and</span>
                        Privacy Policy
                      </span>
                    </span>
                  </label>
                  <ErrorMessage
                    name="terms"
                    component="div"
                    className="text-sm block mt-2 text-[red] capitalize"
                  />
                </div>

                <div className="mb-12">
                  <label className="flex items-center">
                    <Field type="checkbox" name="offers" className="mr-2 " />
                    <span className="text-base font-bold text-brand-darkcyan cursor-pointer select-none">
                      Receive emails on latest offers & membership perks
                    </span>
                  </label>
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
  );
};

export default ContactDetail;
