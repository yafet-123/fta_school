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
        if (status === "authenticated") router.replace("/Teacher");
    }, [status, router]);

    if (status === "unauthenticated")
        return (
            <React.Fragment>
                <MainHeader title="Login" />
                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={Yup.object({
                        username: Yup.string().required('Please enter your username'),
                        password: Yup.string().required('Please enter your password'),
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        const res = await signIn('teacher-credentials', {
                            username: values.username,
                            password: values.password,
                            callbackUrl: "/Teacher",
                            type:"user",
                        });
                        console.log(res)
                        if (res?.error) {
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
                        <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen py-10 shadow-lg ">
                            <div className="w-80 p-6 bg-gray-800 text-white rounded-lg shadow-lg customShadow animateBg">
                                <input name="csrfToken" type="hidden" defaultValue={csrfToken}/>
                                <div className="text-red-400 text-md text-center rounded p-2">
                                    {error}
                                </div>
                                <div className="mb-4">
                                    <Field
                                        name="username"
                                        aria-label="enter your username"
                                        aria-required="true"
                                        type="text"
                                        placeholder="Enter a Username"
                                        className="w-full px-5 py-3 mb-4 bg-white border border-blue-500 rounded focus:outline-none focus:border-blue-400 transition"
                                    />

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="username" />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <Field
                                        name="password"
                                        aria-label="enter your password"
                                        aria-required="true"
                                        type="password"
                                        placeholder="Enter a Password"
                                        className="w-full px-5 py-3 mb-2 bg-white border border-blue-500 rounded focus:outline-none focus:border-blue-400 transition"
                                    />

                                    <div className="text-red-600 text-sm">
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>

                                <Link href="/Teacher/Forgotpassword" >
                                    <a
                                        className="font-bold flex justify-end text-lg lg:text-xl text-red-600 mb-5"
                                    >
                                        forgot password?
                                    </a>
                                </Link>

                                <div className="flex items-center justify-center">
                                    <button
                                        type="submit"
                                        className={formik.isSubmitting ? 'bg-green-200 text-gray-100 p-3 rounded-lg w-full' : 'w-full p-2 bg-green-600 border border-green-600 rounded cursor-pointer hover:bg-green-700 transition'} 
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
    );
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
  const userRole = await session?.user?.role
  if (userRole === 'student') {
    return {
      redirect: {
        destination: '/auth/Student/Login/signin-student', // Redirect to the error page for unauthorized access
        permanent: false,
      },
    };
  }
  
  if (userRole === 'teacher') {
    return {
      redirect: {
        destination: '/Teacher', // Redirect to the error page for unauthorized access
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