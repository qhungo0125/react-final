import * as React from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Box, ButtonGroup } from '@mui/material';
import useGradeDetail from './state.js'
import Loader from '../../../components/Loader'
import { styled } from '@mui/material/styles';
import EditingGrid from './editTable.jsx';


export default function Detail() {
  let {
    loading,
    columns,
    rows,
    editMode,
    handleEditClick,
    fetchGradeDetail
  } = useGradeDetail();

  React.useEffect(() => {
    fetchGradeDetail()
  }, [])

  return (

    <div style={{ width: '100%' }}>
      {loading && <Loader open={loading} />}
      {loading ||
        <div>
          <Box sx={{ width: '100%', marginBottom: '3px', textAlign: "right" }}>
            <Button startIcon={<EditIcon />} sx={{ textTransform: 'none' }} onClick={handleEditClick}>
              Edit
            </Button>
          </Box>
          {editMode ||
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
                "& .MuiDataGrid-virtualScroller": { minHeight: '400px' }
              }}
              pageSizeOptions={[0, 10]}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
              disableColumnMenu
              disableDensitySelector
              disableColumnFilter
            />
          }
          {editMode && <EditingGrid _rows={structuredClone(rows)} _columns={(columns)} />}
        </div>
      }
    </div>
  );
}