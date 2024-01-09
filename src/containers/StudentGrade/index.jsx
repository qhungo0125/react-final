import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useGradeStructure from './state.js'
import Loader from '../../components/Loader'
import { useTranslation } from 'react-i18next';

export default function StudentGrade() {
    const { t } = useTranslation();
    
    let {
        loading,
        columns,
        rows,
        overAll,
        fetchData
    } = useGradeStructure();

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <div style={{ minHeight: 600, maxWidth: 'fit-content', width: "100%" }}>
            {loading && <Loader open={loading} />}
            {!loading &&
                <div>
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
                            "& .MuiDataGrid-virtualScroller": { minHeight: '300px' },
                            width: "100%",
                            marginLeft: "auto",
                            marginRight: 'auto',
                            boxShadow: 2
                        }}
                        pageSizeOptions={[0, 10]}
                        slots={{ toolbar: GridToolbar }}

                        disableColumnMenu
                        disableDensitySelector
                        disableColumnFilter
                        disableColumnSelector
                    />
                    <div style={{textAlign:"center", marginTop:"20px"}}>
                        {t("label.overall")+" : "} &nbsp;&nbsp;
                        <span style={{ fontWeight: "600", fontSize: "130%" }}>
                            {Math.round(overAll * 100) / 100}
                        </span>
                    </div>
                </div>
            }
        </div>
    );
}