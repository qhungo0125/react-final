import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll'
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { randomId } from '@mui/x-data-grid-generator';
import axios from '../../../utils/axiosConfig.js';
import Notice from "../../../components/Alert"
import { MenuContext } from '../../../context/MenuContext';


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        console.log('Generated id:', id);
        setRows((oldRows) => [...oldRows, { id: id, type: '', percentage: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'type' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}

export default function EditingGrid({ _rows, handleEditMode }) {
    const [rows, setRows] = React.useState(_rows);
    const [rowModesModel, setRowModesModel] = React.useState({});

    //notice
    const [openAlert, setOpenAlert] = React.useState(false)
    const [alertContent, setAlertContent] = React.useState("")
    const [alertSeverity, setAlertSeverity] = React.useState("")

    const menuContext = React.useContext(MenuContext);


    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => async () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => async () => {
        setRows(rows.filter((row) => row.id !== id));

        //handle delete 
        await axios.post('/score/delete-type', {
            typeId: id
        })
            .then(res => {
                console.log(res.success)
                if (res.success) {
                    setGradeStructure(res.data)
                    getRows(res.data)
                } else {
                    throw new Error("Error")
                }
            })
            .catch(error => console.log(error))
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

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow };
        updatedRow.type = updatedRow.type.trim()
        if (typeof (updatedRow) === "string") {
            updatedRow.percentage = updatedRow.percentage.trim()
        }


        console.log(updatedRow)

        //validation
        if (updatedRow.type === '') {
            throw new Error("Invalid Composition !")
        }
        if (updatedRow.percentage === '') {
            updatedRow.percentage = '0'
        }
        else if (parseFloat(updatedRow.percentage).toString() != updatedRow.percentage) {
            throw new Error("Percentage must be a Float number !")
        }

        //handle save
        if (updatedRow.isNew) {//true -> create new
            await axios.post('/score/create-type', {
                classId: menuContext.classId,
                name: updatedRow.type,
                percentage: updatedRow.percentage,
            })
                .then(res => {
                    console.log(res)
                    if (res.success) {
                        //set new id for new row
                        updatedRow.id=res.data._id
                        console.log(updatedRow)
                    } else {
                        throw new Error("Error")
                    }
                    
                })
                .catch(error => console.log(error))
        } else {//false -> update
            await axios.post('/score/update-type',
                {
                    name: updatedRow.type,
                    percentage: updatedRow.percentage,
                },
                {
                    params: { typeId: updatedRow.id }
                })
                .then(res => {
                    console.log(res.success)
                    if (res.success) {

                    } else {
                        throw new Error("Error")
                    }
                })
                .catch(error => console.log(error))
        }

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        //notice
        setAlertContent("Action success.")
        setAlertSeverity("success")
        setOpenAlert(true)

        return { ...updatedRow, isNew: false };
    };

    const onProcessRowUpdateError = (error) => {
        setOpenAlert(true)
        setAlertContent(error.message)
        setAlertSeverity("error")
        // setRowModesModel({});
        // setRows(rows.filter((row) => row.id !== id));
        // console.log(error.message)
    }

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: 'type', headerName: 'Composition', width: '249', editable: true },
        { field: 'percentage', headerName: 'Percentage', width: '249', editable: true },
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
                            icon={<DoneIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
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
        }
    ]

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenAlert(false);
    };



    return (
        <div style={{ height: "100%" }}>
            <Box sx={{ width: '100%', marginBottom: '3px', textAlign: "right" }}>
                <div>
                    <Button startIcon={<DoneAllIcon />} sx={{ textTransform: 'none' }} onClick={handleEditMode}>
                        Finish
                    </Button>
                </div>
            </Box>
            <Box
                sx={{
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
                    onProcessRowUpdateError={onProcessRowUpdateError}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    sx={{
                        fontSize: '14px',
                        "& .MuiDataGrid-footerContainer": { display: 'none' },
                        "& .MuiDataGrid-virtualScroller": { minHeight: '300px' },
                        marginLeft: "auto",
                        marginRight: 'auto',
                        boxShadow: 2,
                        width: "100%"
                    }}
                    getRowId={(row) => row.id}
                />
            </Box>
            <Notice content={alertContent} severity={alertSeverity} open={openAlert} handleClose={handleCloseAlert} />
        </div>

    );
}