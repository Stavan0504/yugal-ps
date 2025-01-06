"use client";
import { HelpandSupport } from "@/lib/sanity/types";
import Image from "next/image";
import { FormikProps, useFormik, useFormikContext } from "formik";
import * as Yup from "yup";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { toast } from "sonner";

export interface HelpSupport {
  data: HelpandSupport[];
}

interface FormValues {
  candidateId: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  captcha: string;
  feedback: string;
}

const HelpsandSupport: React.FC<HelpSupport> = ({ data }) => {
  const { name, content } = data?.[0];
  const supabase = useSupabase();
  const { user, loading, error } = useUser();

  const validationSchema = Yup.object({
    candidateId: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Candidate ID is required"),
    name: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Name is required"),
    email: Yup.string()
      .email("Invalid email address").test(
        'no-html-tags',
        'HTML tags or scripts are not allowed',
        (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
      )
      .required("Email ID is required"),
    phone: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Phone No is required"),
    category: Yup.string().required("Please select a category"),
    captcha: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Captcha code is required"),
    feedback: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Feedback is required"),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await formik.submitForm();
  };

  const formik: FormikProps<FormValues> = useFormik({
    initialValues: {
      candidateId: "",
      name: "",
      email: "",
      phone: "",
      category: "Problem related to the website",
      captcha: "",
      feedback: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: FormValues) => {
      const dbValues = {
        candidateId: values.candidateId,
        name: values.name,
        email: values.email,
        phone: values.phone,
        category: values.category,
        captcha: values.captcha,
        feedback: values.feedback,
      };
      try {
        const { data, error } = await supabase
          .from("contact_us_inquiries")
          .insert([{ ...dbValues, id: user?.id }]);
        if (error) {
          throw error;
        }
        if (data) {
          toast.success("Form Submitted Succesfully");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

  return (
    <div>
      {content?.map((item, index) => (
        <div key={index}>
          <div className="flex  items-center justify-center">
            <h1 className="absolute text-[50px] md:text-[56px] lg:text-[64px] text-white font-bold font-Rufina container text-center">
              {item.title}
            </h1>
            {item?.heroimage && (
              <Image
                src={item.heroimage.src as string}
                alt={item.heroimage.altText as string}
                width={item.heroimage.width}
                height={item.heroimage.height}
                className="h-[500px] sm:h-[640px] md:h-[700px] lg:h-[744px] object-cover w-full"
              />
            )}
          </div>
          <div className="container">
            <h2 className="pt-[48px] em:pt-[60px] md:pt-[72px] text-center text-[42px] md:text-[48px] lg:text-[54px] text-black font-bold font-Rufina capitalize mb-[38px] leading-[100%]">
              {name}
            </h2>
            <p className="text-[18px]">{item?.description}</p>

            <div className="flex md:flex-row flex-col w-full justify-between my-[60px] md:my-[80px] lg:my-[108px] gap-y-16">
              <div className="w-full max-w-full md:max-w-[300px] lg:max-w-[359px]">
                <h3 className="text-[30px] font-Rufina font-bold capitalize text-black mb-[20px] md:mb-[42px]">
                  {item?.headQuarters}
                </h3>
                <div className="flex flex-col gap-5 w-full max-w-full md:max-w-[3598px]">
                  {item.contactMethods?.map((item, index) => (
                    <div key={index}>
                      <p className="text-[18px] text-black leading-[110%] w-full max-w-full md:max-w-[300px]">
                        {item.link ? (
                          <a
                            href={`${item.link}:${item.value}`}
                            className="text-brand-cyan hover:opacity-80"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.value}
                          </a>
                        ) : (
                          item.value
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full max-w-full md:max-w-[537px]">
                <h4 className="text-[30px] font-Rufina font-bold capitalize text-black mb-[20px] md:mb-[42px]">
                  Feedback
                </h4>
                <p className="mb-[42px] text-sm text-black">
                  We encourage you to share your questions, comments, and
                  suggestions with us. We’re here to assist you and continuously
                  improve our services.
                </p>

                <form
                  className="flex flex-col gap-8"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="flex esm:flex-row flex-col w-full justify-between gap-6">
                    <div className="md:w-fit w-full">
                      <input
                        type="text"
                        name="candidateId"
                        className="w-full border-b-[1px] border-black bg-transparent pb-2.5 px-3 placeholder:text-[18px] placeholder:text-black/65 outline-none"
                        placeholder="Candidate ID"
                        value={formik.values.candidateId}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.candidateId &&
                        formik.touched.candidateId && (
                          <div className="text-red-500 text-sm">
                            {formik.errors.candidateId}
                          </div>
                        )}
                    </div>

                    <div className="w-full md:max-w-[315px]">
                      <input
                        type="text"
                        name="name"
                        className="w-full border-b-[1px] border-black bg-transparent pb-2.5 px-3 placeholder:text-[18px] placeholder:text-black/65 outline-none"
                        placeholder="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.name && formik.touched.name && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex esm:flex-row flex-col w-full justify-between gap-6">
                    <div className="w-full md:max-w-[315px]">
                      <input
                        type="email"
                        name="email"
                        className="w-full border-b-[1px] border-black bg-transparent pb-2.5 px-3 placeholder:text-[18px] placeholder:text-black/65 outline-none"
                        placeholder="Email ID"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.email}
                        </div>
                      )}
                    </div>

                    <div className="md:w-fit w-full">
                      <input
                        type="tel"
                        name="phone"
                        className="w-full border-b-[1px] border-black bg-transparent pb-2.5 px-3 placeholder:text-[18px] placeholder:text-black/65 outline-none"
                        placeholder="Phone No"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.phone && formik.touched.phone && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.phone}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <select
                      name="category"
                      className="w-full border-b-[1px] border-black bg-transparent pb-2.5 px-3 text-[18px] text-black/65 outline-none"
                      value={formik.values.category}
                      onChange={formik.handleChange}
                    >
                      <option>Problem related to the website</option>
                      <option>Problem related to Candidate</option>
                      <option>Compliments and Suggestions</option>
                      <option>Others</option>
                    </select>
                    {formik.errors.category && formik.touched.category && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.category}
                      </div>
                    )}
                  </div>

                  <div>
                    {/* <label className="block text-gray-700">Captcha Code</label> */}
                    <div className="flex esm:flex-row flex-col gap-6 items-start esm:items-center">
                      <input
                        type="text"
                        name="captcha"
                        className="w-full border-b-[1px] border-black bg-transparent pb-2.5 px-3 placeholder:text-[18px] placeholder:text-black/65 outline-none"
                        placeholder="Enter Captcha Code"
                        value={formik.values.captcha}
                        onChange={formik.handleChange}
                      />
                      <span className="text-black/65 font-mono bg-black/20 px-3 py-2.5 rounded-[5px] text-base sm:text-[18px] md:text-[20px]">
                        aV78D5k
                      </span>
                      {formik.errors.captcha && formik.touched.captcha && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.captcha}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <textarea
                      name="feedback"
                      className="w-full border-b-[1px] border-black bg-transparent pb-[40px] px-3 placeholder:text-[18px] placeholder:text-black/65 outline-none resize-none"
                      placeholder="Please describe your suggestions or feedback in detail."
                      value={formik.values.feedback}
                      onChange={formik.handleChange}
                    ></textarea>
                    {formik.errors.feedback && formik.touched.feedback && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.feedback}
                      </div>
                    )}
                  </div>

                  <div className="">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="bg-brand-darkcyan text-xl text-white px-4 py-2.5 rounded-[5px] hover:scale-105 BasicTransition"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelpsandSupport;
