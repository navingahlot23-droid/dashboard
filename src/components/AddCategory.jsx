import { Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddCategory() {
    const SignupSchema = Yup.object().shape({
        categoryName: Yup.string()
            .required('Enter Category Name'),
        categoryImage: Yup.string()
            .required('Enter Category Image URL'),
        categoryDescription: Yup.string()
            .required('Enter Category Description')
    });

    const navigate = useNavigate();
    return (
        <>
            <h1 className="text-2xl font-bold mb-1 text-cyan-700">Add Category</h1>
            <p className="text-sm">Create or Add categories here</p>
            <div className="form-wrap mt-8 bg-white p-6 border border-gray-300 rounded-md">
                <Formik
                    initialValues={{ 'categoryName': '', 'categoryImage': '', 'categoryDescription': '' }}
                    validationSchema={SignupSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        axios.post("https://6904a8bf6b8dabde4964986c.mockapi.io/dashboard/Category", {
                            name: values.categoryName,
                            image: values.categoryImage,
                            description: values.categoryDescription,
                        }).
                        then(response =>  {navigate("/category");}).
                        catch(err => console.error("Error adding category:", err))
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
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="categoryName" className="block text-sm/6 font-medium text-gray-900">Category Name</label>
                                    <input onChange={handleChange} onBlur={handleBlur} value={values.categoryName} id="categoryName" name="categoryName" type="text" placeholder="Category Name" className="mt-2 block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6" />
                                    <p className="text-sm text-red-600 mb-0"> {errors.categoryName && touched.categoryName && errors.categoryName}</p>
                                </div>
                                <div>
                                    <label htmlFor="categoryImage" className="block text-sm/6 font-medium text-gray-900">Category Image</label>
                                    <input onChange={handleChange} onBlur={handleBlur} value={values.categoryImage} id="categoryImage" name="categoryImage" type="text" placeholder="Category Image" className="mt-2 block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6" />
                                    <p className="text-sm text-red-600 mb-0"> {errors.categoryImage && touched.categoryImage && errors.categoryImage}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 mt-4">
                                <div>
                                    <label htmlFor="categoryDescription" className="block text-sm/6 font-medium text-gray-900">Category Description</label>
                                    <textarea onChange={handleChange} onBlur={handleBlur} value={values.categoryDescription} id="categoryDescription" name="categoryDescription" type="text" placeholder="Category Description" className="mt-2 block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6" />
                                    <p className="text-sm text-red-600 mb-0"> {errors.categoryDescription && touched.categoryDescription && errors.categoryDescription}</p>
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