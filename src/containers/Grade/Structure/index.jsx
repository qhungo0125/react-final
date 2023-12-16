import * as React from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Box, ButtonGroup } from '@mui/material';
import useGradeStructure from './state.js'
import Loader from '../../../components/Loader'
import { styled } from '@mui/material/styles';
import EditingGrid from './editTable.jsx';


export default function Structure() {
    let {
        loading,
        columns,
        rows,
        editMode,
        handleEditMode,
        fetchData
    } = useGradeStructure();

    React.useEffect(() => {
        fetchData()
    }, [])

    console.log(editMode)

    return (
        <div style={{ height: 600, width: '100%' }}>
            {loading && <Loader open={loading} />}
            {!loading && editMode && <EditingGrid _rows={structuredClone(rows)} handleEditMode={handleEditMode}/>}
            {!loading && editMode ||
                <div>
                    <Box sx={{ width: '100%', marginBottom: '3px', textAlign: "right" }}>
                        <Button startIcon={<EditIcon />} sx={{ textTransform: 'none' }} onClick={handleEditMode}>
                            Edit
                        </Button>
                    </Box>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 10 },
                            },
                        }}
                        sx={{
                            fontSize: '14px',
                            "& .MuiDataGrid-footerContainer": { display: 'none' },
                            width: "500px",
                            marginLeft: "auto",
                            marginRight: 'auto'
                        }}
                        pageSizeOptions={[0, 10]}
                        slots={{ toolbar: GridToolbar }}

                        disableColumnMenu
                        disableDensitySelector
                        disableColumnFilter
                        disableColumnSelector
                    />
                </div>
            }
        </div>
    );
}