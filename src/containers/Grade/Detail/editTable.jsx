import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from '@mui/icons-material/Close';
import DoneAllIcon from '@mui/icons-material/DoneAll'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import axios from '../../../utils/axiosConfig.js';
import { TextField } from '@mui/material';
import { randomId } from '@mui/x-data-grid-generator';
import { MenuContext } from '../../../context/MenuContext';
import { GradeAPI } from '../../../api/grade.js'
import { getClass } from '../../../api/class.js';

import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';



function EditToolbar(props) {
    const { setRows, setRowModesModel, _columns: columns } = props;
    const menuContext = React.useContext(MenuContext);

    const [studentList, setStudentList] = React.useState([])
    const [open, setOpen] = React.useState(false)
    const [id, setId] = React.useState("")
    const [name, setName] = React.useState("")

    const handleClick = () => {
        let new_rows = columns.reduce((result, item) => {
            result[item.field] = ""
            return result
        }, {})

        const id = randomId();
        setRows((oldRows) => [...oldRows, { id: id, 'name': name, ...new_rows, isNew: true }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));

        setOpen(false)
    };

    React.useEffect(() => {
        const fetchStudent = async () => {
            try {
                const res = await getClass( menuContext.classId)
                setStudentList(res.data.students)
            } catch (error) {
            }
        }
        fetchStudent()
    }, [])

    console.log(studentList)

    const handleChangeId = (student) => {
        setName(student.name)
    }

    const handleClose = () => {
        setOpen(close)
        setName("")
        setId("")
    }

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
                Add record
            </Button>
            <Dialog
                aria-labelledby="customized-dialog-title"
                open={open}
                sx={{ maxWidth: "500px", marginLeft: "auto", marginRight: "auto" }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Add student scores
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ paddingInline: '60px' }}>
                    <Autocomplete
                        key="name-dialog"
                        disablePortal
                        id="id-add"
                        options={studentList}
                        sx={{ width: 300 }}
                        getOptionLabel={(option) => option.mapCode || ""}
                        isOptionEqualToValue={(option, value) => option.mapCode === value}
                        renderInput={(params) => <TextField {...params} label="Student ID" />}
                        onChange={(event, newValue) => {
                            if (!newValue) return
                            setId(newValue.mapCode);
                            handleChangeId(newValue)
                        }}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id={"name-ad"}
                        label="Student name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        sx={{ marginTop:"20px" }}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ pt: 2 }}>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button autoFocus onClick={handleClick}>
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
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

    const handleDeleteClick = (id, rawScores) => async () => {
        setRows(rows.filter((row) => row.id !== id));

        //handle delete 
        const deleteScore = async (scoreId) => {
            await axios.post('/score/delete-score', {
                scoreId: scoreId
            })
        }

        console.log(rawScores)

        const score_delete = (rawScores[0].scoreBoard.filter(score => score.student._id === id))[0].scores
        console.log(score_delete)
        score_delete.map(score => deleteScore(score.scoreId))

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
                console.log(typeId, value)
                await axios.post('/score/create-score', {
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
                            updatedRow.id = res.data._id
                        } else {
                            throw new Error("Error")
                        }

                    })
                    .catch((error) => console.log(error))
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
                        onClick={handleDeleteClick(id, rawScores)}
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