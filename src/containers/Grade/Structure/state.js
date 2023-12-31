import React from 'react';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axiosConfig.js';
import { MenuContext } from '../../../context/MenuContext';


const GRADE_COLUMN_WIDTH = 150;

export default function useGradeStructure() {
    const navigate = useNavigate();
    const [gradeStructure, setGradeStructure] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [editMode, setEditMode] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    const menuContext = React.useContext(MenuContext);


    const columns = [
        { field: 'type', headerName: 'Composition', width: '249' },
        { field: 'percentage', headerName: 'Percentage', width: '249' }
    ]

    const fetchData = () => {
        //fetch data
        setLoading(true);
        // const userId = localStorage.getItem('userid');
        const getScoreTypes = async () => {
            await axios.get('/score/types')
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
                .finally(() => setLoading(false))
        }

        getScoreTypes();
    }

    const getRows = (data) => {
        let temp_rows = []
        for (var i = 0; i < data.length; i++) {
            temp_rows = [...temp_rows, {
                id: `${data[i]._id}`, type: data[i].name, percentage: data[i].percentage
            }]
        }
        setRows(temp_rows)
        console.log(temp_rows)
    }

    const handleEditMode = () => {
        setEditMode(prev => !prev)
    }

    function handleSaveChanges(isSave, _rows) {
        if (isSave) {//is save
            setRows(_rows)
        }
        handleEditMode()
    }

    return {
        loading,
        gradeStructure,
        columns,
        rows,
        editMode,
        handleEditMode,
        handleSaveChanges,
        fetchData
    };
}
