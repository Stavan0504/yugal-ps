import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import TablistButtons from "@/components/Tablist/tablistButtons";
import options from "@/store/options.json";
import { useFormStore } from "@/store/formStore";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { AstroForm as Astrotype } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";
import { toast } from "sonner";

const { Mangalik, Nakshatra } = options;

const TimePicker = ({ field, form }: { field: any; form: any }) => {
  const [time, setTime] = useState(field.value || "12:00");
  const handleTimeChange = (event: any) => {
    const selectedTime = event.target.value;
    setTime(selectedTime);
    form.setFieldValue(field.name, selectedTime);
  };

  return (
    <input
      className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3  outline-none text-base text-brand-darkGreen"
      type="time"
      onChange={handleTimeChange}
      value={time.slice(0, 5)}
    />
  );
};

const AstroForm = () => {
  const supabase = useSupabase();
  const [dbData, setDbData] = useState<Astrotype>();
  const formikRef = useRef<FormikProps<Astrotype>>(null);
  const { user, loading, error } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("astro")
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
        mangalik: dbData.mangalik || "",
        nakshatra: dbData.nakshatra || "",
        birth_time: dbData.birth_time || "",
        birth_place: dbData.birth_place || "",
        believe_in_kundli: dbData.believe_in_kundli || "",
      });
    }
  }, [dbData]);

  const validationSchema = Yup.object({
    mangalik: Yup.string().required("Mangalik is required"),
    nakshatra: Yup.string().required("Nakshatra is required"),
    birth_time: Yup.string().required("Birth time is required"),
    birth_place: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Birth place is required"),
    believe_in_kundli: Yup.string().required("Believe in kundli is required"),
  });

  const handleSubmit = async (values: any) => {
    const dbValues = {
      mangalik: values.mangalik,
      nakshatra: values.nakshatra,
      birth_time: values.birth_time,
      birth_place: values.birth_place,
      believe_in_kundli: values.believe_in_kundli,
    };
    const { data, error } = await supabase
      .from("astro")
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
          mangalik: "",
          nakshatra: "",
          birth_time: "",
          birth_place: "",
          believe_in_kundli: "",
        }}
        validateOnMount={true}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ setFieldValue, isValid, validateForm, values }) => (
          <Form className="">
            <TablistWrapper isvalidate={isValid} validateForm={validateForm} values={values}>
              <div className="container">
                <div className="bg-brand-blue50 rounded-lg px-4 em:px-10 lg:px-[64px] py-8 mt-16">

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mb-[56px]">
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Mangalik
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3">
                        <Field
                          as="select"
                          name="mangalik"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select...</option>
                          {Mangalik?.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="mangalik"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Nakshatra
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3">
                        <Field
                          as="select"
                          name="nakshatra"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select...</option>
                          {Nakshatra?.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="nakshatra"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Birth Time
                      </label>
                      <Field name="birth_time" component={TimePicker} />
                      <ErrorMessage
                        name="birth_time"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Birth Place
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3">
                        <Field
                          type="text"
                          name="birth_place"
                          className="w-full outline-none text-base text-brand-darkGreen"
                          placeholder="Enter your Birth Place"
                        />
                      </div>
                      <ErrorMessage
                        name="birth_place"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>

                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Believe in Kundli
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3">
                        <Field
                          as="select"
                          name="believe_in_kundli"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select...</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </Field>
                      </div>
                      <ErrorMessage
                        name="believe_in_kundli"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <TablistButtons
              isvalidate={isValid}
              /> */}
            </TablistWrapper>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AstroForm;
