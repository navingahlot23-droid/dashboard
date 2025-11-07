import { Formik } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import CustomTextField from "./CustomTextField";

function AddProduct() {
    const SignupSchema = Yup.object().shape({
        productName: Yup.string()
            .required('Enter Product Name'),
        productImage: Yup.string()
            .required('Enter Product Image URL'),
        productCategory: Yup.string()
            .required('Enter Product Category'),
        productMaterial: Yup.string()
            .required('Enter Product Material'),
        productPrice: Yup.string()
            .required('Enter Product Price'),
        productDiscountPrice: Yup.string()
            .required('Enter Product Discount'),
        productSold: Yup.string()
            .required('Enter Product Quantity Sold'),
        productTags: Yup.string()
            .required('Enter Product Tags'),
        productDescription: Yup.string()
            .required('Enter Product Description')
    });

    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    return (
        <>
            <h1 className="text-2xl font-bold mb-1 text-cyan-700">Add Product</h1>
            <p className="text-sm">Create or Add products here</p>
            <div className="form-wrap mt-10">
                <Formik
                    initialValues={
                        {
                            "productName": "",
                            "productImage": "",
                            "productCategory": "",
                            "productMaterial": "",
                            "productPrice": "",
                            "productDiscountPrice": "",
                            "productSold": "",
                            "productTotalRevenue": "",
                            "productTags": "",
                            "productDescription": "",
                            "productRating": ""
                        }
                    }
                    validationSchema={SignupSchema}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            axios.post("https://690c3a1d6ad3beba00f7bae3.mockapi.io/dashboard/ProductDetails", {
                                name: values.productName,
                                image: values.productImage,
                                category: values.productCategory,
                                material: values.productMaterial,
                                price: values.productPrice,
                                discountPrice: values.productDiscountPrice,
                                sold: values.productSold,
                                tags: values.productTags,
                                description: values.productDescription,
                                avgRating: values.productRating,
                                totalRevenue: values.productTotalRevenue
                            })
                                .then(response => {
                                    setFormSuccess("Product Added Successfully", response);

                                    // hide message after 2 seconds
                                    setTimeout(() => {
                                        setFormSuccess("");
                                    }, 2000);
                                }).
                                catch(err => {
                                    setFormError("Error Adding Product", err);
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
                                <p className="mb-0 absolute text-sky-700 bg-white p-1 -top-5 left-2 font-semibold">Product Information</p>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                    <div>
                                        <CustomTextField
                                            label="Product Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productName}
                                            id="productName"
                                            name="productName"
                                        />
                                        <p className="text-sm text-red-600 mb-0"> {errors.productName && touched.productName && errors.productName}</p>
                                    </div>
                                    <div>
                                        <CustomTextField
                                            label="Product Image"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productImage}
                                            id="productImage"
                                            name="productImage"
                                        />
                                        <p className="text-sm text-red-600 mb-0"> {errors.productImage && touched.productImage && errors.productImage}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 mt-4">
                                    <div>
                                        <CustomTextField
                                            label="Product Description"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productDescription}
                                            id="productDescription"
                                            name="productDescription"
                                            multiline
                                        />
                                        <p className="text-sm text-red-600 mb-0"> {errors.productDescription && touched.productDescription && errors.productDescription}</p>
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-4">
                                    <div>
                                        <CustomTextField
                                            label="Product Material"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productMaterial}
                                            id="productMaterial"
                                            name="productMaterial"
                                        />
                                        <p className="text-sm text-red-600 mb-0"> {errors.productMaterial && touched.productMaterial && errors.productMaterial}</p>
                                    </div>
                                    <div>
                                        <CustomTextField
                                            label="Product Price"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productPrice}
                                            id="productPrice"
                                            name="productPrice"
                                        />
                                        <p className="text-sm text-red-600 mb-0"> {errors.productPrice && touched.productPrice && errors.productPrice}</p>
                                    </div>
                                    <div>
                                        <CustomTextField
                                            label="Discount (%)"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productDiscountPrice}
                                            id="productDiscountPrice"
                                            name="productDiscountPrice"
                                        />
                                        <p className="text-sm text-red-600 mb-0"> {errors.productDiscountPrice && touched.productDiscountPrice && errors.productDiscountPrice}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-8">
                                <div className="relative bg-white p-6 border border-sky-700 rounded-md">
                                    <p className="mb-0 absolute text-sky-700 bg-white p-1 -top-5 left-2 font-semibold">Product Category</p>

                                    <select className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6" id="productCategory" name="productCategory" onChange={handleChange} onBlur={handleBlur}>
                                        <option value="">Select Category</option>
                                        <option value="Beauty">Beauty</option>
                                        <option value="Fragrances">Fragrances</option>
                                        <option value="Furniture">Furniture</option>
                                        <option value="Groceries">Groceries</option>
                                    </select>
                                    <p className="text-sm text-red-600 mb-0"> {errors.productCategory && touched.productCategory && errors.productCategory}</p>
                                </div>

                                <div className="relative bg-white p-6 border border-sky-700 rounded-md">
                                    <p className="mb-0 absolute text-sky-700 bg-white p-1 -top-5 left-2 font-semibold">Sales Information</p>
                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                        <div>
                                            <CustomTextField
                                                label="Quantity Sold"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.productSold}
                                                id="productSold"
                                                name="productSold"
                                            />
                                            <p className="text-sm text-red-600 mb-0"> {errors.productSold && touched.productSold && errors.productSold}</p>
                                        </div>
                                        <div>
                                            <CustomTextField
                                                label="Total Revenue (0)"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.productTotalRevenue}
                                                id="productTotalRevenue"
                                                name="productTotalRevenue"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="relative bg-white p-6 border border-sky-700 rounded-md mt-8">
                                <p className="mb-0 absolute text-sky-700 bg-white p-1 -top-5 left-2 font-semibold">Additional Information</p>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                    <div>
                                        <CustomTextField
                                            label="Tags"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productTags}
                                            id="productTags"
                                            name="productTags"
                                        />
                                        <p className="text-xs text-gray-500 m-0">Tags should be comma separated. Eg: black, jeans, cotton</p>
                                        <p className="text-sm text-red-600 mb-0"> {errors.productTags && touched.productTags && errors.productTags}</p>
                                    </div>
                                    <div>
                                        <CustomTextField
                                            label="Avg. Rating"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.productRating}
                                            id="productRating"
                                            name="productRating"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6">
                                {formError && <p className="mb-4 flex align-center text-sm font-semibold p-1.5 px-2 rounded-sm text-red-600 bg-red-200 border-red-400 border"><CloseIcon className="mr-2 p-1 bg-red-600 rounded-full text-white w-8 h-8" />{formError}</p>}

                                {formSuccess && <p className="mb-4 text-sm flex align-center font-semibold py-1.5 px-2 rounded-sm text-green-700 bg-green-200 border-green-400 border"><CheckIcon className="mr-2 p-1 bg-green-800 rounded-full text-white" /> {formSuccess}</p>}
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="cursor-pointer w-full md:w-auto flex justify-center rounded-md bg-sky-700 p-3 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                >
                                    Add Product
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>

            </div>
        </>
    )
}

export default AddProduct;