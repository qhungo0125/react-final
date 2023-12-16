import React from 'react';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axiosConfig.js';

const GRADE_COLUMN_WIDTH = 150;

export default function useGradeStructure() {
    const navigate = useNavigate();
    const [gradeStructure, setGradeStructure] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [editMode, setEditMode] = React.useState(false);
    const [rows, setRows] = React.useState([]);

    const columns = [
        {field: 'type', headerName: 'Composition', width:'249'},
        {field: 'percentage', headerName: 'Percentage', width:'249'}
    ]

    const fetchData = () => {
        //fetch data
        setLoading(true);
        // const userId = localStorage.getItem('userid');
        const getScoreTypes = async () => {
            const { success, data } = await axios.post(`/score/mock/grade-structure`);
            if (data) {
                setGradeStructure(data)
                console.log(data)
                getRows(data)
                setLoading(false)
            }
        }

        getScoreTypes();

    }

    const getRows = (data) => {
        let temp_rows = []
        for (var i = 0; i < data.length; i++) {
            temp_rows = [...temp_rows, {
                id: `${data[i].scoreTypeId}`, type: data[i].scoreTypeName, percentage: data[i].percentage
            }]
        }
        setRows(temp_rows)
        console.log(temp_rows)
    }

    const handleEditMode = () => {
        setEditMode(prev => !prev)
    }

    function handleSaveChanges (isSave, _rows) {
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