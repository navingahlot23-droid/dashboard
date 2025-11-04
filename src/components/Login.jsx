import logo from "../assets/logo-small.svg";
import { Formik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

export default function Login() {
    const [formError, setFormError] = useState('');
    const navigate = useNavigate();
    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(5, 'must be at least 5 characters long!')
            .required('Enter Username'),
        password: Yup.string()
            .min(5, 'must be at least 5 characters long!')
            .required('Enter Password')
    });
    return (
        <>

            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="Your Company"
                        src={logo}
                        className="mx-auto h-10 w-auto"
                    />
                    <h2 className="mt-7 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Formik
                        initialValues={{ 'username': '', 'password': '' }}
                        validationSchema={SignupSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                axios.post("https://dummyjson.com/auth/login", values).
                                    then(response => navigate('/dashboard')).
                                    catch(err => setFormError(err.response.data.message))
                            }, 400)
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                 {formError && <p className=" text-center text-sm font-semibold p-1 rounded-sm text-red-700 bg-red-200 border-red-400 border">{formError}</p>}
                                <div>
                                    <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                                        Username
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="username"
                                            name="username"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.username}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        <p className="text-sm text-red-800 mb-0"> {errors.username && touched.username && errors.username}</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        />
                                        <p className="text-sm text-red-800 mb-0">{errors.password && touched.password && errors.password}</p>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex w-full justify-center rounded-md bg-sky-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </button>
                                </div>
                               
                            </form>
                        )}

                    </Formik>

                </div>
            </div>
        </>
    )
}
