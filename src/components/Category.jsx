import * as React from 'react';
import { useEffect } from "react"
import axios from 'axios'

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CloseIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridActionsCellItem,
    GridRowEditStopReasons,
    Toolbar,
    ToolbarButton,
} from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = Math.trunc(Math.random() * 10);
        setRows((oldRows) => [
            ...oldRows,
            { id, name: '', image: '', description: '', isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <Toolbar>
            <Tooltip title="Add record">
                <ToolbarButton onClick={handleClick}>
                    <AddIcon fontSize="small" />
                </ToolbarButton>
            </Tooltip>
        </Toolbar>
    );
}



export default function Category() {
    const [rows, setRows] = React.useState([]);
    const [rowModesModel, setRowModesModel] = React.useState({});
    const [openModal, setOpenModal] = React.useState(false);
    const [selectedCategory, setSelectedCategory] = React.useState(null);

    useEffect(() => {
        axios.get('https://6904a8bf6b8dabde4964986c.mockapi.io/dashboard/Category')
            .then(function (response) {
                // handle success
                setRows(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, []);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleViewClick = (id) => () => {
        setSelectedCategory(rows.find((row) => row.id === id));
        setOpenModal(true);
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'name', headerName: 'Name', width: 180, editable: true },
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
            editable: true,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 600,
            editable: true,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            material={{
                                sx: {
                                    color: 'primary.main',
                                },
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<VisibilityIcon />}
                        label="View"
                        className="textPrimary"
                        onClick={handleViewClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    return (
        <Box
            sx={{
                height: 550,
                width: '100%',
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{ toolbar: EditToolbar }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
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
        </Box>
    );
}

