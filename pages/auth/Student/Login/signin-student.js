<<<<<<< HEAD
import { useState, useEffect } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { useSession, getSession } from "next-auth/react";
import { MainHeader } from "../../../../components/common/MainHeader";
import { FaUser, FaLock } from "react-icons/fa";
import Link from "next/link";
import React from "react";

export default function SignIn({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") router.replace("/Students");
  }, [status, router]);

  if (status === "unauthenticated")
    return (
      <React.Fragment>
        <MainHeader title="Login Student" />
        <div className="py-24 min-h-screen flex items-center justify-center bg-gradient-to-br from-[#417094] via-white to-[#417094] px-4">
          <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 border border-[#417094]">
            <h2 className="text-3xl font-bold text-center text-[#417094] mb-2">
              Welcome Back 👋
            </h2>
            <p className="text-center text-gray-600 mb-6">
              Sign in to access your student dashboard
            </p>

            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={Yup.object({
                username: Yup.string().required("Please enter your username"),
                password: Yup.string().required("Please enter your password"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                const res = await signIn("student-credentials", {
                  username: values.username,
                  password: values.password,
                  callbackUrl: "/Students",
                  type: "student",
                }); 

                if (res?.error) {
                  setError("Invalid username or password");
                  router.push(`/auth/error/student-credentials`);
                } else {
                  setError(null);
                  if (res.url) router.push(res.url);
                }
                setSubmitting(false);
              }}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <input
                    name="csrfToken"
                    type="hidden"
                    defaultValue={csrfToken}
                  />
                  {error && (
                    <div className="text-red-500 text-center mb-4 font-semibold">
                      {error}
                    </div>
                  )}

                  {/* Username Field */}
                  <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-1">
                      Username
                    </label>
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#417094]">
                      <FaUser className="text-[#417094] mr-2" />
                      <Field
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        className="w-full outline-none"
                      />
                    </div>
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">
                      Password
                    </label>
                    <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-[#417094]">
                      <FaLock className="text-[#417094] mr-2" />
                      <Field
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="w-full outline-none"
                      />
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end mb-5">
                    <Link
                      href="/Students/ForgotPassword"
                      className="text-sm text-[#417094] hover:text-[#417094] font-semibold"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className={`w-full py-3 rounded-lg font-semibold transition ${
                      formik.isSubmitting
                        ? "bg-[#417094] text-white cursor-not-allowed"
                        : "bg-[#417094] text-white hover:bg-[#417094]"
                    }`}
                  >
                    {formik.isSubmitting ? "Please wait..." : "Sign In"}
                  </button>

                  {/* Signup Redirect */}
                  <p className="text-center text-gray-600 mt-6">
                    Don’t have an account?{" "}
                    <Link
                      href="/signup"
                      className="text-[#417094] font-semibold hover:underline"
                    >
                      Sign Up
                    </Link>
                  </p>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </React.Fragment>
=======
import { useState, useEffect } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react";
import { MainHeader } from '../../../../components/common/MainHeader';
import React from 'react'
import Link from 'next/link'
import { getSession } from "next-auth/react";

export default function SignIn({ csrfToken }) {
    const router = useRouter();
    const [error, setError] = useState(null);
    const { status, data } = useSession(); 
    useEffect(() => {
        if (status === "authenticated") router.replace("/Students");
    }, [status, router]);

    if (status === "unauthenticated")
        return (
            <React.Fragment>
                <MainHeader title="Login Student" />
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Please enter your username'),
                        password: Yup.string().required('Please enter your password'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const res = await signIn('student-credentials', {
                            username: values.username,
                            password: values.password,
                            callbackUrl: "/Students",
                            type:"student",
                        });
                        console.log(res)
                        if (res?.error) {
                            router.push(`/auth/error/student-credentials`);
                            setError(res.error);
                        } else {
                            setError(null);
                        }
                        if (res.url) router.push(res.url);
                        setSubmitting(false);
                    }}
                >
                    {(formik) => (
                      <form onSubmit={formik.handleSubmit}>
                        <div className="bg-gray-100  flex flex-col items-center justify-center min-h-screen py-2 shadow-lg">
                            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                                <div className="text-red-400 text-md text-center rounded p-2">
                                    {error}
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="username" className="uppercase text-sm text-gray-600 font-bold">
                                        User Name
                                        <Field
                                            name="username"
                                            aria-label="enter your username"
                                            aria-required="true"
                                            type="text"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="username" />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="password" className="uppercase text-sm text-gray-600 font-bold">
                                        password
                                        <Field
                                            name="password"
                                            aria-label="enter your password"
                                            aria-required="true"
                                            type="password"
                                            className="w-full bg-gray-300 text-gray-900 mt-2 p-3"
                                        />
                                    </label>

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>

                                <Link href="/Students/Forgotpassword" >
                                    <a
                                        className="font-bold flex justify-end text-lg lg:text-xl text-red-600 mb-5"
                                    >
                                        forgot password?
                                    </a>
                                </Link>

                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className={formik.isSubmitting ? 'bg-green-200 text-gray-100 p-3 rounded-lg w-full' : 'bg-green-600 text-gray-100 p-3 rounded-lg w-full'} 
                                    >
                                        {formik.isSubmitting ? 'Please wait...' : 'Sign In'}
                                    </button>
                                </div>
                            </div>
                        </div>
                      </form>
                    )}
                </Formik>
            </React.Fragment>
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    );
}

export async function getServerSideProps(context) {
<<<<<<< HEAD
  const session = await getSession(context);
  const userRole = await session?.user?.role;
  console.log(userRole)
  if (userRole === "student") {
    return {
      redirect: { destination: "/Students", permanent: false },
    };
  }
  if (userRole === "teacher") {
    return {
      redirect: {
        destination: "/auth/Teacher/Login/signin-teacher",
        permanent: false,
      },
    };
  }
  if (userRole === "admin") {
    return {
      redirect: {
        destination: "/auth/Admin/Login/signin-user",
        permanent: false,
      },
    };
  }

  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
=======
    const session = await getSession(context);
    const userRole = await session?.user?.role
    console.log("student")
    if (userRole === 'student') {
        return {
            redirect: {
                destination: '/Students', // Redirect to the error page for unauthorized access
                permanent: false,
            },
        };
    }
  
    if (userRole === 'teacher') {
        return {
            redirect: {
                destination: '/auth/Teacher/Login/signin-teacher', // Redirect to the error page for unauthorized access
                permanent: false,
          },
        };
    }

    if (userRole === 'admin') {
        return {
            redirect: {
                destination: '/auth/Admin/Login/signin-user', // Redirect to the error page for unauthorized access
                permanent: false,
            },
        };
    }
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
}   
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
