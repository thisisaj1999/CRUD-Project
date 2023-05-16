import React, { Component } from 'react';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: this.props.allCities,
    };
  }

  signupSchema = Yup.object().shape({
    fname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    contact: Yup.number().typeError('use only numbers').required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    address: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    city: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    gender: Yup.string().required('Required'),
  });

  render() {
    return (
      <div className="h-screen">
        <div className="py-5 mx-7 flex justify-between items-center fixed right-0 left-0">
          <h1 className="text-3xl font-medium">Add User</h1>

          <Link href="/all-users">
            <button
              type="button"
              className="focus:outline-none text-white bg-green-600  hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Users List
            </button>
          </Link>
        </div>

        <div className="flex justify-center items-center h-full w-screen pt-5">
          <Formik
            initialValues={{
              fname: '',
              lname: '',
              contact: '',
              email: '',
              address: '',
              city: '',
              gender: '',
            }}
            validationSchema={this.signupSchema}
            onSubmit={(values) => {
              const contactUpdate = parseInt(values.contact);
              this.props.formData({ ...values, contact: contactUpdate });
            }}
          >
            {({ errors, touched }) => (
              <Form className="relative overflow-x-auto shadow-md sm:rounded-lg m-5 w-3/5 h-[85vh]">
                <div className="p-10 flex flex-col justify-center h-full">
                  <div className="flex justify-between gap-10">
                    {/* fName */}
                    <div className="mb-5 w-1/2">
                      <label
                        htmlFor="fname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <Field
                        name="fname"
                        id="fname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="fname"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* lName */}
                    <div className="mb-5 w-1/2">
                      <label
                        htmlFor="lname"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <Field
                        name="lname"
                        id="lname"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="lname"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-10">
                    {/* Contact */}
                    <div className="mb-5 w-1/2">
                      <label
                        htmlFor="contact"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Contact
                      </label>
                      <Field
                        name="contact"
                        id="contact"
                        maxLength={10}
                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="contact"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Email */}
                    <div className="mb-5 w-1/2">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between gap-10">
                    <div className="w-1/2 flex flex-col justify-between">
                      {/* City */}
                      <div className="mb-5">
                        <label
                          htmlFor="city"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          City
                        </label>

                        <Field
                          name="city"
                          id="city"
                          as="select"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          <option value="" disabled>
                            Select an option
                          </option>
                          {this.state.cities.map((city, idx) => (
                            <option
                              key={`${city}_${idx}`}
                              value={city.toLowerCase()}
                            >
                              {city}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>

                      {/* Gender */}
                      <div className="mb-5">
                        <label
                          id="gender-radio-group"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Gender
                        </label>

                        <div
                          role="group"
                          className="flex gap-8"
                          aria-labelledby="gender-radio-group"
                        >
                          <label className="cursor-pointer">
                            <Field
                              type="radio"
                              name="gender"
                              className="align-middle"
                              value="Male"
                            />
                            <span className="ml-1 align-baseline">Male</span>
                          </label>

                          <label className="cursor-pointer">
                            <Field
                              type="radio"
                              name="gender"
                              className="align-middle"
                              value="Female"
                            />
                            <span className="ml-1 align-baseline">Female</span>
                          </label>
                        </div>

                        <ErrorMessage
                          name="gender"
                          component="div"
                          className="text-red-600 text-sm"
                        />
                      </div>
                    </div>

                    {/* Address */}
                    <div className=" w-1/2">
                      <label
                        htmlFor="address"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Address
                      </label>
                      <Field
                        as="textarea"
                        rows={6}
                        name="address"
                        id="address"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="address"
                        component="div"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="text-white flex self-start mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default index;
