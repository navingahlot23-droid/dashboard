import * as React from 'react';
import { useEffect } from "react"
import axios from 'axios'

import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import Tooltip from '@mui/material/Tooltip';
import CustomTextField from './CustomTextField';

import {
    DataGrid,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';


export default function Product() {
    const [rows, setRows] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);
    const [updateSuccess, setUpdateSuccess] = React.useState("");
    const [discountAmount, setDiscountAmount] = React.useState(0);
    const [finalPrice, setFinalPrice] = React.useState(0);

    useEffect(() => {
        axios.get('https://690c3a1d6ad3beba00f7bae3.mockapi.io/dashboard/ProductDetails')
            .then(function (response) {
                // handle success
                setRows(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            const price = parseFloat(selectedProduct.price) || 0;
            const discount = parseFloat(selectedProduct.discountPrice) || 0;
            const discountValue = (price * discount) / 100;
            const finalValue = price - discountValue;

            setDiscountAmount(discountValue);
            setFinalPrice(finalValue);
        }
    }, [selectedProduct?.price, selectedProduct?.discountPrice, selectedProduct]);

    const handleViewClick = (id) => () => {
        setSelectedProduct(rows.find((row) => row.id === id));
        setOpenModal(true);
    };

    const handleEditClick = (id) => () => {
        setSelectedProduct(rows.find((row) => row.id === id));
        setUpdateSuccess("");
        setOpenEditModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedProduct((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSaveClick = () => {
        axios.put(`https://690c3a1d6ad3beba00f7bae3.mockapi.io/dashboard/ProductDetails/${selectedProduct.id}`, selectedProduct)
            .then(function (response) {
                // handle success
                setRows((prevRows) =>
                    prevRows.map((row) =>
                        row.id === selectedProduct.id ? response.data : row
                    )
                );
                setUpdateSuccess("Product updated successfully");
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    };

    const handleDeleteClick = (id) => () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this Product?");
        if (!confirmDelete) return;

        axios.delete(`https://690c3a1d6ad3beba00f7bae3.mockapi.io/dashboard/ProductDetails/${id}`)
            .then((response) => {
                // ✅ Remove from local state immediately
                setRows((prevRows) => prevRows.filter((row) => row.id !== id));
                alert("Product deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting product:", error);
                alert("Failed to delete product. Please try again.");
            });
    };


    const columns = [
        { field: 'name', headerName: 'Name', width: 100 },
        {
            field: 'image',
            headerName: 'Image',
            width: 120,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt={params.row.title}
                    style={{
                        width: 100,
                        height: 100,
                        marginBlock: 10,
                        objectFit: 'cover',
                        borderRadius: 8,
                        objectPosition: 'top'
                    }}
                />
            ),
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 100,
        },
        {
            field: 'material',
            headerName: 'Material',
            width: 100,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
        },
        {
            field: 'discountPrice',
            headerName: 'Discount Price',
            width: 100,
        },
        {
            field: 'sold',
            headerName: 'Quantity Sold',
            width: 100,
        },
        {
            field: 'tags',
            headerName: 'Tags',
            width: 100,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 120,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<Tooltip title="View Product" arrow placement="bottom"> <VisibilityIcon /> </Tooltip>}
                        label="View"
                        onClick={handleViewClick(id)}
                        sx={{ color: '#555', '&:hover': { color: '#000' } }}
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title="Edit Product" arrow placement="bottom"> <EditIcon /> </Tooltip>}
                        label="Edit"
                        onClick={handleEditClick(id)}
                        sx={{ color: '#555', '&:hover': { color: '#000' } }}
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title="Delete Product" arrow placement="bottom"> <DeleteIcon /> </Tooltip>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        tooltip="Delete Category"
                        sx={{ color: '#555', '&:hover': { color: '#000' } }}
                    />,
                ];
            },
        },
    ];

    return (
        <>
            <h1 className="text-2xl font-bold mb-1 text-cyan-700">Product</h1>
            <p className="text-sm mb-8">View, Edit and Delete Product</p>
            <Box
                sx={{
                    height: 550,
                    width: '100%'
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns}
                    editMode="row"
                    showToolbar
                    getRowHeight={() => 'auto'}

                />
                {/* 👁️ Product Info Modal */}
                <Modal open={openModal} onClose={() => { setOpenModal(false) }}>
                    <Box className="absolute top-0 left-0 md:top-1/2 md:left-1/2 md:translate-x-[-50%] md:translate-y-[-50%] bg-white p-4 md:rounded-xl md:w-2xl md:h-auto md:overflow-y-auto h-full w-full overflow-y-scroll">
                        {selectedProduct && (
                            <div className='relative'>
                                <div className='absolute w-8 h-8 text-center text-lg  rounded-full bg-white md:-top-2.5 md:-right-2.5 top-0 right-0 cursor-pointer' onClick={() => { setOpenModal(false) }}><CloseIcon /></div>
                                <div className='flex gap-4 md:flex-nowrap md:flex-row flex-col'>
                                    <div className='img-box'>
                                        <img className='mb-4 md:mb-0 md:w-48 w-full object-cover object-top rounded-xl' src={selectedProduct.image} />
                                    </div>
                                    <div className='content-box w-full'>
                                        <h3 className='mb-4 text-lg font-bold md:text-xl'>{selectedProduct.name}</h3>
                                        <div className='flex gap-2 flex-nowrap items-center mb-4'>
                                            <p className='text-sm mb-0 text-gray-500 line-through'>₹{selectedProduct.price}</p>
                                            <p className='text-xl mb-0 font-semibold text-sky-700'>₹{finalPrice.toFixed(2)}</p>
                                            <p className='text-xs px-2 py-1 rounded-md mb-0 font-medium bg-green-700 text-white'>{selectedProduct.discountPrice}% OFF</p>
                                        </div>
                                        <p className='text-[15px] mb-4'>{selectedProduct.description}</p>
                                        <p className='text-sm mb-1 border-b border-gray-400 pb-1'><span className='font-semibold'>Material: </span>{selectedProduct.material}</p>
                                        <p className='text-sm mb-1 border-b border-gray-400 pb-1'><span className='font-semibold'>Category: </span>{selectedProduct.category}</p>
                                        <p className='text-sm  mb-1 border-b border-gray-400 pb-1'><span className='font-semibold'>Quantity Sold: </span>{selectedProduct.sold}</p>
                                        <p className='text-sm  mb-1 border-b border-gray-400 pb-1'><span className='font-semibold'>Avg. Rating: </span>{selectedProduct.avgRating}</p>
                                        <p className='text-sm  mb-1 border-b border-gray-400 pb-1'><span className='font-semibold'>Total Revenue: </span>{selectedProduct.totalRevenue}</p>
                                        <p className='text-sm mb-0'><span className='font-semibold'>Tags: </span>{selectedProduct.tags}</p>

                                    </div>
                                </div>
                            </div>
                        )}
                    </Box>
                </Modal>

                {/* 👁️ Edit Product Info Modal */}
                <Modal open={openEditModal} onClose={() => { setOpenEditModal(false) }}>
                    <Box className="absolute top-0 left-0 lg:top-1/2 lg:left-1/2 lg:translate-x-[-50%] lg:translate-y-[-50%] bg-white p-4 lg:rounded-xl lg:w-3xl  h-full w-full overflow-y-scroll">
                        {selectedProduct && (
                            <div className='relative'>
                                <div className='absolute w-8 h-8 text-center text-lg  rounded-full bg-white md:-top-2.5 md:-right-2.5 -top-2.5 -right-2.5 cursor-pointer' onClick={() => { setOpenEditModal(false) }}><CloseIcon /></div>
                                <h3 className='text-xl font-bold mb-8 pr-4.5'>Update Product - {selectedProduct.name}</h3>
                                <div className="relative bg-white p-6 border border-sky-700 rounded-md">
                                    <p className="mb-0 absolute text-sky-700 bg-white p-1 -top-5 left-2 font-semibold">Product Information</p>
                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                        <div>
                                            <CustomTextField autoFocus
                                                label="Product Name"
                                                onChange={handleInputChange}
                                                value={selectedProduct.name}
                                                id="productName"
                                                name="name"
                                            />
                                        </div>
                                        <div>
                                            <CustomTextField autoFocus
                                                label="Product Image"
                                                onChange={handleInputChange}
                                                value={selectedProduct.image}
                                                id="productImage"
                                                name="image"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 mt-4">
                                        <div>
                                            <CustomTextField autoFocus
                                                label="Product Description"
                                                onChange={handleInputChange}
                                                value={selectedProduct.description}
                                                id="productDescription"
                                                name="description"
                                                multiline
                                            />
                                        </div>
                                    </div>
                                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 mt-4">
                                        <div>
                                            <CustomTextField autoFocus
                                                label="Product Material"
                                                onChange={handleInputChange}
                                                value={selectedProduct.material}
                                                id="productMaterial"
                                                name="material"
                                            />
                                        </div>
                                        <div>
                                            <CustomTextField autoFocus
                                                label="Product Price"
                                                onChange={handleInputChange}
                                                value={selectedProduct.price}
                                                id="productPrice"
                                                name="price"
                                            />
                                        </div>
                                        <div>
                                            <CustomTextField autoFocus
                                                label="Discount (%)"
                                                onChange={handleInputChange}
                                                value={selectedProduct.discountPrice}
                                                id="productDiscountPrice"
                                                name="discountPrice"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 mt-8">
                                    <div className="relative bg-white p-6 border border-sky-700 rounded-md">
                                        <p className="mb-0 absolute text-sky-700 bg-white p-1 -top-5 left-2 font-semibold">Product Category</p>

                                        <select className="block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-400 placeholder:text-gray-600 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6" id="productCategory" name="category" onChange={handleInputChange} value={selectedProduct.category}>
                                            <option value="">Select Category</option>
                                            <option value="Beauty">Beauty</option>
                                            <option value="Fragrances">Fragrances</option>
                                            <option value="Furniture">Furniture</option>
                                            <option value="Groceries">Groceries</option>
                                        </select>
                                    </div>

                                    <div className="relative bg-white p-6 border border-sky-700 rounded-md">
                                        <p className="mb-0 absolute text-sky-700 bg-white p-1 -top-5 left-2 font-semibold">Sales Information</p>
                                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                            <div>
                                                <CustomTextField autoFocus
                                                    label="Quantity Sold"
                                                    onChange={handleInputChange}
                                                    value={selectedProduct.sold}
                                                    id="productSold"
                                                    name="sold"
                                                />
                                            </div>
                                            <div>
                                                <CustomTextField autoFocus
                                                    label="Total Revenue (0)"
                                                    onChange={handleInputChange}
                                                    value={selectedProduct.totalRevenue}
                                                    id="productTotalRevenue"
                                                    name="totalRevenue"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative bg-white p-6 border border-sky-700 rounded-md mt-8">
                                    <p className="mb-0 absolute text-sky-700 bg-white p-1 -top-5 left-2 font-semibold">Additional Information</p>
                                    <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                        <div>
                                            <CustomTextField autoFocus
                                                label="Tags"
                                                onChange={handleInputChange}
                                                value={selectedProduct.tags}
                                                id="productTags"
                                                name="tags"
                                            />
                                            <p className="text-xs text-gray-500 m-0">Tags should be comma separated. Eg: black, jeans, cotton</p>
                                        </div>
                                        <div>
                                            <CustomTextField autoFocus
                                                label="Avg. Rating"
                                                onChange={handleInputChange}
                                                value={selectedProduct.avgRating}
                                                id="productRating"
                                                name="avgRating"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    {updateSuccess && <p className="mt-6 text-sm flex align-center font-semibold py-1.5 px-2 rounded-sm text-green-700 bg-gray-200"><CheckIcon className="mr-2 text-green-800" /> {updateSuccess}</p>}
                                </div>

                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        onClick={handleSaveClick}
                                        className="cursor-pointer w-full md:w-auto flex justify-center rounded-md bg-sky-700 p-3 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
                                    >
                                        Save
                                    </button>
                                </div>

                            </div>
                        )}
                    </Box>
                </Modal>
            </Box>
        </>

    );
}

