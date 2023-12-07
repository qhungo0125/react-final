import * as React from 'react';
import { DataGrid, GridToolbar, GridActionsCellItem, GridToolbarContainer } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Button, IconButton, Box, ButtonGroup } from '@mui/material';

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const ToolBar = () => {
  return (
    <GridToolbarContainer>
      <Button component="label" variant="contained" startIcon={<EditIcon />} width="80">
        Edit
      </Button>
    </GridToolbarContainer>
  )
}


export default function Detail() {
  const [editMode, setEditMode] = React.useState(false);

  const handleEditClick = (id) => () => {
    // <IconButton aria-label="delete" size="small">
    //   <EditIcon fontSize="small" />
    // </IconButton>

  };


  return (
    <div style={{ height: 600, width: '100%' }}>
      <Box sx={{ width: '100%', marginBottom: '3px', textAlign:"right" }}>
        <Button startIcon={<EditIcon />} sx={{ textTransform: 'none' }}>
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
        sx={{ fontSize: '14px' }}
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
    </div>
  );
}