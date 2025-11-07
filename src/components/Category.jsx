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

import {
    DataGrid,
    GridActionsCellItem,
} from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';


export default function Category() {
    const [rows, setRows] = React.useState([]);
    const [openModal, setOpenModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState(null);
    const[updateSuccess, setUpdateSuccess] = React.useState("");
    
    useEffect(() => {
        axios.get('https://6904a8bf6b8dabde4964986c.mockapi.io/dashboard/Category')
            .then(function (response) {
                // handle success
                setRows(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }, []);


    const handleViewClick = (id) => () => {
        setSelectedCategory(rows.find((row) => row.id === id));
        setOpenModal(true);
    };

    const handleEditClick = (id) => () => {
        setSelectedCategory(rows.find((row) => row.id === id));
        setUpdateSuccess("");
        setOpenEditModal(true);
    };

    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setSelectedCategory((prev) => ({
            ...prev,
            [name] : value
        })) 
    };

    const handleSaveClick = () => {
        axios.put(`https://6904a8bf6b8dabde4964986c.mockapi.io/dashboard/Category/${selectedCategory.id}`, selectedCategory)
        .then(function (response) {
            // handle success
            setRows((prevRows) =>
                prevRows.map((row) =>
                  row.id === selectedCategory.id ? response.data : row
                )
              );
              setUpdateSuccess("Category updated successfully");
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        });
    };

    const handleDeleteClick = (id) => () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (!confirmDelete) return;
      
        axios.delete(`https://6904a8bf6b8dabde4964986c.mockapi.io/dashboard/Category/${id}`)
          .then((response) => {
            // ✅ Remove from local state immediately
            setRows((prevRows) => prevRows.filter((row) => row.id !== id));
            alert("Category deleted successfully!");
          })
          .catch((error) => {
            console.error("Error deleting category:", error);
            alert("Failed to delete category. Please try again.");
          });
      };
   

    const columns = [
        { field: 'name', headerName: 'Name', width: 180 },
        {
            field: 'image',
            headerName: 'Image',
            width: 150,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt={params.row.name}
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
            field: 'description',
            headerName: 'Description',
            width: 600,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 200,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<Tooltip title="View Category" arrow placement="bottom"> <VisibilityIcon/> </Tooltip>}
                        label="View"
                        onClick={handleViewClick(id)}
                        sx = {{color : '#555', '&:hover': {color : '#000'} }}
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title="Edit Category" arrow placement="bottom"> <EditIcon/> </Tooltip>}
                        label="Edit"
                        onClick={handleEditClick(id)}
                        sx = {{color : '#555', '&:hover': {color : '#000'} }}
                    />,
                    <GridActionsCellItem
                        icon={<Tooltip title="Delete Category" arrow placement="bottom"> <DeleteIcon/> </Tooltip>}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        tooltip ="Delete Category"
                        sx = {{color : '#555', '&:hover': {color : '#000'} }}
                    />,
                ];
            },
        },
    ];

    return (
        <>
         <h1 className="text-2xl font-bold mb-1 text-cyan-700">Category</h1>
         <p className="text-sm mb-8">View, Edit and Delete Category</p>
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
            {/* 👁️ Category Info Modal */}
            <Modal open={openModal} onClose={() => { setOpenModal(false) }}>
                <Box className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-xl w-2xs md:w-lg">
                    {selectedCategory && (
                        <div className='md:flex md:flex-nowrap md:gap-8 relative'>
                            <div className='absolute w-8 h-8 text-center text-lg  rounded-full bg-white md:-top-2.5 md:-right-2.5 -top-8.5 -right-5.5 cursor-pointer' onClick={() => { setOpenModal(false) }}><CloseIcon/></div>
                            <div className='img-box'>
                                <img className='mb-4 md:mb-0 md:w-48 w-full object-cover object-top rounded-xl' src={selectedCategory.image} />
                            </div>
                            <div className='content-box'>
                                <h3 className='mb-1 text-md font-semibold md:text-lg'>{selectedCategory.name}</h3>
                                <p className='text-sm mb-0'>{selectedCategory.description}</p>
                            </div>
                        </div>
                    )}
                </Box>
            </Modal>

            {/* 👁️ Edit Category Info Modal */}
            <Modal open={openEditModal} onClose={() => { setOpenEditModal(false) }}>
                <Box className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-xl w-2xs md:w-lg">
                    {selectedCategory && (
                        <div className='relative'>
                            <div className='absolute w-8 h-8 text-center text-lg  rounded-full bg-white md:-top-2.5 md:-right-2.5 -top-8.5 -right-5.5 cursor-pointer' onClick={() => { setOpenEditModal(false) }}><CloseIcon/></div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
                                <div>
                                    <label htmlFor="categoryName" className="block text-sm/6 font-medium text-gray-900">Name</label>
                                    <input onChange={handleInputChange} value={selectedCategory.name} id="categoryName" name="name" type="text" placeholder="Category Name" className="mt-2 block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6" />
                                    
                                </div>
                                <div>
                                    <label htmlFor="categoryImage" className="block text-sm/6 font-medium text-gray-900">Image</label>
                                    <input onChange={handleInputChange} value={selectedCategory.image} id="categoryImage" name="image" type="text" placeholder="Category Image" className="mt-2 block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6" />
                                    
                                </div>
                            </div>
                            <div className="grid grid-cols-1 mt-4">
                                <div>
                                    <label htmlFor="categoryDescription" className="block text-sm/6 font-medium text-gray-900">Description</label>
                                    <textarea onChange={handleInputChange} value={selectedCategory.description} id="categoryDescription" name="description" type="text" placeholder="Category Description" className="mt-2 block w-full rounded-md bg-white p-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-sky-600 sm:text-sm/6" />
                                    
                                </div>
                            </div>
                            {updateSuccess && <p className="mt-6 text-sm flex align-center font-semibold py-1.5 px-2 rounded-sm text-green-700 bg-gray-200"><CheckIcon className="mr-2 text-green-800"/> {updateSuccess}</p>}

                            <div className="mt-6">
                                <button onClick={handleSaveClick}
                                    type="submit"
                                    className="cursor-pointer flex justify-center rounded-md bg-sky-700 p-3 text-sm/6 font-semibold text-white shadow-xs hover:bg-sky-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
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

