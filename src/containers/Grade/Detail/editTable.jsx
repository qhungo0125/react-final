import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll'
import axios from '../../../utils/axiosConfig.js';
import { randomId } from '@mui/x-data-grid-generator';

import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';

function EditToolbar(props) {
    const { setRows, setRowModesModel, _columns } = props;

    let new_rows = {}
    for (var i = 0; i < _columns.length; i++) {
        new_rows = { ...new_rows, [_columns[i].headerName]: '' }
    }

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id: id, ...new_rows, isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
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

export default function EditingGrid({ _columns, _rows, scoreTypes, rawScores, handleEditMode }) {
    const [rows, setRows] = React.useState(_rows);
    const [rowModesModel, setRowModesModel] = React.useState({});

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

    const handleDeleteClick = (id, scoresTypes, rawScores) => async () => {
        setRows(rows.filter((row) => row.id !== id));

        //handle delete 
        const deleteScore = async (scoreId) => {
            await axios.post('/score/delete-score', {
                scoreId: scoreId
            })
        }

        const score_delete = rawScores.filter(score => score.student._id === id)
        console.log(score_delete)
        score_delete.map(score => deleteScore(score._id))

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


    const processRowUpdate = (scoreTypes) => async (newRow) => {
        const updatedRow = { ...newRow };
        console.log(updatedRow)

        //handle save

        if (updatedRow.isNew) {//true -> create new
            const createScore = async (typeId, value) => {
                await axios.post('/score/create-score', {
                    teacherId: localStorage.getItem("userid"),
                    studentId: updatedRow.id,
                    typeId: typeId,
                    value: value
                    //gui them 1 mang score
                })
                    .then(res => {
                        console.log(res)
                        if (res.success) {
                            //set new id for new row
                            updatedRow.id = res.data._id
                        } else {
                            throw new Error("Error")
                        }

                    })
                    .catch(error => console.log(error))
            }
            console.log(scoreTypes)
            scoreTypes.map(type => {
                createScore(type._id, updatedRow[type._id])
            })


        } else {//false -> update
            const updateScore = async (typeId, value) => {
                await axios.post('/score/update-score', {
                    teacherId: localStorage.getItem("userid"),
                    studentId: updatedRow.id,
                    typeId: typeId,
                    value: parseFloat(value)
                    //gui them 1 mang score
                })
                    .then(res => {
                        console.log(res)
                        if (res.success) {
                            //set new id for new row
                        } else {
                            throw new Error("Error")
                        }

                    })
                    .catch(error => console.log(error))
            }
            console.log(scoreTypes)
            scoreTypes.map(type => {
                updateScore(type._id, updatedRow[type._id])
            })
        }

        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

        return { ...updatedRow, isNew: false };
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const onProcessRowUpdateError = (error) => {
        // setOpenAlert(true)
        // setAlertContent(error.message)
        // setAlertSeverity("error")
        alert(error)
    }

    const columns = [
        ...(_columns.map(column => (
            { ...column, editable: true }
        ))),
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
                        onClick={handleDeleteClick(id, scoreTypes, rawScores)}
                        color="inherit"
                    />,
                ];
            },
        }
    ]

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
                    height: 500,
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
                    processRowUpdate={processRowUpdate(scoreTypes)}
                    onProcessRowUpdateError={onProcessRowUpdateError}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel, _columns },
                    }}
                    sx={{ "& .MuiDataGrid-footerContainer": { display: 'none' } }}
                />
            </Box>
        </div>
    );
}