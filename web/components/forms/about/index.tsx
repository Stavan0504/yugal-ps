import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import TablistButtons from "@/components/Tablist/tablistButtons";
import * as Yup from "yup";
import options from "@/store/options.json";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { AboutYouForm as AboutYouType } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";
import { toast } from "sonner";
import DOMPurify from "dompurify";

const AboutYouForm = () => {
  const supabase = useSupabase();
  const { user, loading, error } = useUser();
  const [dbData, setDbData] = useState<AboutYouType>();
  const formikRef = useRef<
    FormikProps<
      Omit<AboutYouType, "height"> & {
        heightInch: number;
        heightFeet: number;
      }
    >
  >(null);
  const { Gender } = options;

  useEffect(() => {
    const fetchContactData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("about_you")
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

    fetchContactData();
  }, [user, supabase]);

  useEffect(() => {
    if (dbData && formikRef.current) {
      const height = dbData.height ? String(dbData.height) : "";
      const [feet, inches] = height.split("'");

      formikRef.current.setValues({
        gender: dbData.gender || "",
        about_candidate: dbData.about_candidate || "",
        heightFeet: Number(feet) ? Number(feet) : 0,
        date_of_birth: dbData.date_of_birth || "",
        heightInch: inches ? Number(inches) : 0,
        weight: dbData.weight || 0,
      });
    }
  }, [dbData]);

  const validationSchema = Yup.object({
    about_candidate: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Description is required"),
    heightFeet: Yup.number()
      .required("Height is required")
      .positive("Must be positive")
      .integer("Must be an integer"),
    heightInch: Yup.number()
      .required("Height is required")
      .integer("Must be an integer")
      .min(0, "Inches cannot be negative"),
    weight: Yup.number()
      .required("Weight is required")
      .positive("Must be positive"),
    date_of_birth: Yup.date()
      .required("DOB is required")
      .nullable()
      .test("age", "You must be at least 18 years old", (value) => {
        if (!value) return false;
        const today = new Date();
        const birthDate = new Date(value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        const dayDiff = today.getDate() - birthDate.getDate();
        return (
          age > 18 ||
          (age === 18 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
        );
      }),
  });

  const handleSubmit = async (values: any) => {
    const sanitizedAboutCandidate = DOMPurify.sanitize(values.about_candidate, {
      ALLOWED_TAGS: [
        "b",
        "i",
        "em",
        "strong",
        "u",
        "a",
        "p",
        "br",
        "ul",
        "ol",
        "li",
        "img",
      ], // Safe tags
      ALLOWED_ATTR: ["href", "src", "alt"], // Safe attributes
      FORBID_TAGS: ["script", "iframe", "style"],
      FORBID_ATTR: [
        "onload",
        "onclick",
        "onerror",
        "onmouseover",
        "onfocus",
        "onblur",
      ], // Block dangerous attributes
      ALLOWED_URI_REGEXP: /^(https?|ftp|mailto|tel):/,
    });

    const height = `${values.heightFeet}'${values.heightInch}`;

    const dbValues = {
      gender: values.gender,
      about_candidate: sanitizedAboutCandidate,
      height: height,
      weight: values.weight,
      date_of_birth: values.date_of_birth,
    };
    const { data, error } = await supabase
      .from("about_you")
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
          gender: "",
          about_candidate: "",
          heightFeet: "",
          heightInch: "",
          weight: "",
          date_of_birth: "",
        }}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ values, handleChange, isValid, validateForm }) => (
          <Form className=" ">
            <TablistWrapper
              isvalidate={isValid}
              validateForm={validateForm}
              values={values}
            >
              <div className="container">
                <div className="bg-brand-blue50 rounded-lg px-4 em:px-10 lg:px-[64px] py-8 mt-16">
                  <div className="mb-6">
                    <label className="block text-black text-xl leading-5 font-medium mb-4">
                      Gender
                    </label>
                    <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus-within:ring-blue-700">
                      <Field
                        as="select"
                        name="gender"
                        className="w-full outline-none text-base text-brand-darkGreen"
                      >
                        <option value="">Select...</option>
                        {Gender?.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-sm block mt-2 text-[red] capitalize"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-black text-xl leading-5 font-medium mb-6">
                      About Candidate
                    </label>
                    <Field
                      as="textarea"
                      name="about_candidate"
                      className="w-full p-3 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack placeholder:w-full placeholder:max-w-xl resize-none scrollbarHide"
                      rows={3}
                      placeholder="Please describe yourself in few words for your Personality, Family Details, Career, Partner Expectations etc."
                    />
                    <ErrorMessage
                      name="about_candidate"
                      component="div"
                      className="text-sm block mt-2 text-[red] capitalize"
                    />
                  </div>

                  <div className="mb-8">
                    <label className="block text-black text-xl leading-5 font-medium mb-6">
                      Height
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 em:gap-8 ">
                      <div>
                        <Field
                          type="number"
                          name="heightFeet"
                          className="w-full p-2.5 border border-gray-300 rounded-md"
                          placeholder="Feet"
                        />
                        <ErrorMessage
                          name="heightFeet"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                      <div>
                        <Field
                          type="number"
                          name="heightInch"
                          className="w-full p-2.5 border border-gray-300 rounded-md"
                          placeholder="Inch"
                        />
                        <ErrorMessage
                          name="heightInch"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2  gap-6 mb-[56px]">
                    <div className="">
                      <div>
                        <label className="block text-black text-xl leading-5 font-medium mb-6">
                          Date of Birth
                        </label>
                        <Field
                          type="date"
                          name="date_of_birth"
                          className="w-full p-2.5 border border-gray-300 rounded-md"
                        />
                        <ErrorMessage
                          name="date_of_birth"
                          component="div"
                          className="text-sm block mt-2 text-[red] capitalize"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-6">
                        Weight <span className="text-md">(in kg)</span>
                      </label>
                      <Field
                        type="number"
                        name="weight"
                        className="w-full p-2.5 border border-gray-300 rounded-md"
                        placeholder="Weight"
                      />
                      <ErrorMessage
                        name="weight"
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

export default AboutYouForm;
