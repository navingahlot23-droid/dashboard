import { Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CustomTextField from "./CustomTextField";

function AddCategory() {
    const SignupSchema = Yup.object().shape({
        categoryName: Yup.string()
            .required('Enter Category Name'),
        categoryImage: Yup.string()
            .required('Enter Category Image URL'),
        categoryDescription: Yup.string()
            .required('Enter Category Description')
    });

    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    return (
        <>
            <h1 className="text-2xl font-bold mb-1 text-cyan-700">Add Category</h1>
            <p className="text-sm">Create or Add categories here</p>
            <div className="form-wrap mt-8">
                <Formik
                    initialValues={{ 'categoryName': '', 'categoryImage': '', 'categoryDescription': '' }}
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            axios.post("https://6904a8bf6b8dabde4964986c.mockapi.io/dashboard/Category", {
                                name: values.categoryName,
                                image: values.categoryImage,
                                description: values.categoryDescription,
                            })
                                .then(response => {
                                    setFormSuccess("Category Added Successfully", response);

                                    // hide message after 2 seconds
                                    setTimeout(() => {
                                        setFormSuccess("");
                                    }, 2000);
                                }).
                                catch(err => {
                                    setFormError("Error Adding Category", err);
                                    // hide message after 2 seconds
                                    setTimeout(() => {
                                        setFormError("");
                                    }, 3000);
                                })
                            setSubmitting(false);
                            resetForm();
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
                        <form onSubmit={handleSubmit}>
                            <div className="relative bg-white p-6 border border-sky-700 rounded-md">
                                <p className="mb-0 absolute text-sky-700 bg-white p-1 -top-5 left-2 font-semibold">Category Information</p>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                    <div>
                                        <CustomTextField
                                            label="Category Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.categoryName}
                                            id="categoryName"
                                            name="categoryName"
                                        />

                                        <p className="text-sm text-red-600 mb-0"> {errors.categoryName && touched.categoryName && errors.categoryName}</p>
                                    </div>
                                    <div>
                                        <CustomTextField
                                            label="Category Image"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.categoryImage}
                                            id="categoryImage"
                                            name="categoryImage"
                                        />
                                        <p className="text-sm text-red-600 mb-0"> {errors.categoryImage && touched.categoryImage && errors.categoryImage}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 mt-4">
                                    <div>
                                        <CustomTextField
                                            label="Category Description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.categoryDescription}
                                            id="categoryDescription"
                                            name="categoryDescription"
                                            multiline
                                        />
                                        <p className="text-sm text-red-600 mb-0"> {errors.categoryDescription && touched.categoryDescription && errors.categoryDescription}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    {formError && <p className="mb-4 flex align-center text-sm font-semibold p-1.5 px-2 rounded-sm text-red-600 bg-red-200 border-red-400 border"><CloseIcon className="mr-2 p-1 bg-red-600 rounded-full text-white w-8 h-8" />{formError}</p>}

                                    {formSuccess && <p className="mb-4 text-sm flex align-center font-semibold py-1.5 px-2 rounded-sm text-green-700 bg-green-200 border-green-400 border"><CheckIcon className="mr-2 p-1 bg-green-800 rounded-full text-white" /> {formSuccess}</p>}
                                </div>
                            </div>
                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="cursor-pointer flex justify-center rounded-md bg-sky-700 p-3 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                >
                                    Add Category
                                </button>
                            </div>

                        </form>
                    )}
                </Formik>

            </div>
        </>
    )
}

export default AddCategory;