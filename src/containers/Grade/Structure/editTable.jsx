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


function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
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

    console.log(openAlert)

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
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
        updatedRow.type = updatedRow.type.trim()
        updatedRow.percentage = updatedRow.percentage.trim()
        if (updatedRow.type === '') {
            throw new Error("Invalid Composition !")
        }
        if (updatedRow.percentage === '') {
            updatedRow.percentage = '0'
        }
        if (!parseFloat(updatedRow.percentage)) {
            throw new Error("Percentage must be a Float number !")
        }
        console.log(updatedRow)
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        //notice
        setAlertContent("Action success.")
        setAlertSeverity("success")
        setOpenAlert(true)

        return updatedRow;
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

    const handleSaveChangesClick = async () => {
        // send changes
        handleEditMode()
        console.log("edit click")

        // sua lai gui rows, khong gui tung dong
        const { success, data } = await axios.post(`/score/mock/update-grade-composition`,
            {
                subjectId: "",
                teacherId: "",
                semesterId: "",
                scoreTypeId: "",
                newScoreTypeName: "",
                isPublish: ""
            });
        if (data) {
            console.log(data)
        }
    }

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
                        marginLeft: "auto",
                        marginRight: 'auto',
                        boxShadow: 2,
                        width: "100%"
                    }}
                />
            </Box>
            <Notice content={alertContent} severity={alertSeverity} open={openAlert} handleClose={handleCloseAlert} />
        </div>

    );
}