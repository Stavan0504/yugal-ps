import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import TablistButtons from "@/components/Tablist/tablistButtons";
import options from "@/store/options.json";
import useSupabase from "@/utils/hooks/useSupabase";
import useUser from "@/utils/hooks/useUser";
import { LocationForm as LocationTypes } from "@/store/types/forms";
import TablistWrapper from "@/components/Tablist/TablistWrapper";
import { toast } from "sonner";

const { Residency_Status, Ethnic_Origin } = options;

const LocationForm = () => {
  const supabase = useSupabase();
  const [dbData, setDbData] = useState<LocationTypes>();
  const formikRef = useRef<FormikProps<LocationTypes>>(null);
  const { user, loading } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        const { data, error } = await supabase
          .from("location")
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
        country: dbData.country || "",
        state: dbData.state || "",
        city: dbData.city || "",
        address_detail: dbData.address_detail || "",
        zip_code: dbData.zip_code || 0,
        residency_status: dbData.residency_status || "",
        grew_up_in: dbData.grew_up_in || "",
        ethnic_origin: dbData.ethnic_origin || "",
        parents_living_in: dbData.parents_living_in || "",
      });
    }
  }, [dbData]);

  const validationSchema = Yup.object({
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    address_detail: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Address detail is required"),
    zip_code: Yup.string().required("Zip code is required"),
    residency_status: Yup.string().required("Residency status is required"),
    grew_up_in: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("GrewUpIn is required"),
    ethnic_origin: Yup.string().required("Ethnic origin is required"),
    parents_living_in: Yup.string().test(
      'no-html-tags',
      'HTML tags or scripts are not allowed',
      (value) => !(/<\/?[a-z][\s\S]*>/i).test(value as string)
    ).required("Parents living is required"),
  });

  const handleSubmit = async (values: any) => {
    const dbValues = {
      country: values.country,
      state: values.state,
      city: values.city,
      address_detail: values.address_detail,
      zip_code: values.zip_code,
      residency_status: values.residency_status,
      grew_up_in: values.grew_up_in,
      ethnic_origin: values.ethnic_origin,
      parents_living_in: values.parents_living_in,
    };
    const { data, error } = await supabase
      .from("location")
      .upsert([{ ...dbValues, id: user?.id }])
      .select();

    if (data) {
      toast.success('Data saved successfully!')
    }
  };

  // store all countrys
  const [countries, setCountries] = useState([]);
  // store selected country
  const [selectedCountries, setSelectedCountry] = useState("");
  // store all states ( fetched using country name )
  const [states, setStates] = useState([]);
  // store selected country
  const [selectedState, setSelectedState] = useState("");
  // store all cities ( fetched using state name )
  const [cities, setCities] = useState([]);
  // store error while fetching states
  const [error, setError] = useState(null);

  // get all countries
  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("https://restcountries.com/v3.1/all?fields=name");
      const data = await res.json();
      const commonNames = data
        .map((country: { name: { common: string } }) => country.name.common)
        .sort();
      setCountries(commonNames);
    };

    fetchCountries();
  }, []);
  // getting states by using country name
  useEffect(() => {
    if (selectedCountries) {
      const fetchStates = async () => {
        try {
          const response = await fetch(
            "https://countriesnow.space/api/v0.1/countries/states",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ country: selectedCountries }),
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          const states = data.data.states.map(
            (state: { name: string }) => state.name
          );
          setStates(states);
        } catch (error: any) {
          setError(error);
        }
      };
      fetchStates();
    }
  }, [selectedCountries]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/state/cities",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: selectedCountries,
              state: selectedState,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setCities(data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [selectedState, selectedCountries]);

  return (
    <div className="">
      <Formik
        initialValues={{
          country: "",
          state: "",
          city: "",
          address_detail: "",
          zip_code: "",
          residency_status: "",
          grew_up_in: "",
          ethnic_origin: "",
          parents_living_in: "",
        }}
        validationSchema={validationSchema}
        validateOnMount={true}
        onSubmit={handleSubmit}
        innerRef={formikRef}
      >
        {({ setFieldValue, values, isValid, validateForm }) => (
          <Form className=" ">
            <TablistWrapper isvalidate={isValid} validateForm={validateForm} values={values}>
              <div className="container">
                <div className="bg-brand-blue50 rounded-lg px-4 em:px-10 lg:px-[64px] py-8 mt-16">

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Country
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="country"
                          className="w-full outline-none text-base text-brand-darkGreen"
                          onChange={(e: any) => {
                            const value = e.target.value;
                            setFieldValue("country", value);
                            setSelectedCountry(value);
                          }}
                        >
                          <option value="">Select...</option>
                          {countries?.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                          {/* Add more options as needed */}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        State
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="state"
                          className="w-full outline-none text-base text-brand-darkGreen"
                          onChange={(e: any) => {
                            const value = e.target.value;
                            setFieldValue("state", value);
                            setSelectedState(value);
                          }}
                        >
                          <option value="">Select...</option>
                          {states?.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                          {/* Add more options as needed */}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        City
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="city"
                          className="w-full outline-none text-base text-brand-darkGreen"
                          onChange={(e: any) => {
                            const value = e.target.value;
                            setFieldValue("city", value);
                          }}
                        >
                          <option value="">Select...</option>
                          {cities?.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                          {/* Add more options as needed */}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="city"
                        component="div"
                        className="text-red-600"
                      />
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-black text-xl leading-5 font-medium mb-4">
                      Address Detail
                    </label>
                    <Field
                      as="textarea"
                      name="address_detail"
                      className="w-full p-3 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack placeholder:w-full placeholder:max-w-sm resize-none scrollbarHide"
                      rows={3}
                      placeholder="Type detail address, Flat No, Name, Landmark Optional nearby landmark"
                    />
                    <ErrorMessage
                      name="address_detail"
                      component="div"
                      className="text-sm block mt-2 text-[red] capitalize"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 gap-y-8 mb-8">
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Zip Code
                      </label>
                      <Field
                        type="number"
                        name="zip_code"
                        className="w-full p-2  border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                      />
                      <ErrorMessage
                        name="zip_code"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Residency Status
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="residency_status"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select...</option>
                          {Residency_Status?.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                          {/* Add more options as needed */}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="residency_status"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Grew up in
                      </label>
                      <Field
                        type="text"
                        name="grew_up_in"
                        className="w-full p-2  border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack "
                      />
                      <ErrorMessage
                        name="grew_up_in"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>
                    <div>
                      <label className="block text-black text-xl leading-5 font-medium mb-4">
                        Ethnic Origin
                      </label>
                      <div className="block w-full bg-white border border-brand-grayBorder rounded-md py-2 px-3 ">
                        <Field
                          as="select"
                          name="ethnic_origin"
                          className="w-full outline-none text-base text-brand-darkGreen"
                        >
                          <option value="">Select...</option>
                          {Ethnic_Origin?.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                          {/* Add more options as needed */}
                        </Field>
                      </div>
                      <ErrorMessage
                        name="ethnic_origin"
                        component="div"
                        className="text-sm block mt-2 text-[red] capitalize"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-black text-xl leading-5 font-medium mb-4">
                      Parent’s living in
                    </label>
                    <Field
                      as="textarea"
                      name="parents_living_in"
                      className="w-full p-3 border-[1px] border-brand-grayBorder  text-base text-brand-lightBlack rounded-[6px] placeholder:text-base placeholder:text-brand-lightBlack placeholder:w-full placeholder:max-w-xl resize-none scrollbarHide"
                      rows={3}
                      placeholder="Type the full address with city, state and country name"
                    />
                    <ErrorMessage
                      name="parents_living_in"
                      component="div"
                      className="text-sm block mt-2 text-[red] capitalize"
                    />
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

export default LocationForm;
