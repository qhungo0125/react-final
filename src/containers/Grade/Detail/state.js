import React from 'react';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axiosConfig';
import { infoField } from './gradeConfig.js'
import { useState } from 'react';
import { MenuContext } from '../../../context/MenuContext';

const GRADE_COLUMN_WIDTH = 150;

export default function useGradeDetail() {
    const navigate = useNavigate();
    const [scoresTypes, setScoreTypes] = useState([])
    const [scores, setScores] = useState({})
    const [columns, setColumns] = useState([])
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(false)
    const [editMode, setEditMode] = React.useState(false);

    const menuContext = React.useContext(MenuContext);

    let check = 0;

    const fetchGradeDetail = () => {
        //fetch data
        setLoading(true);
        // const userId = localStorage.getItem('userid');
        const getScoreTypes = async () => {
            await axios.get('/score/scoretypes')
                .then(data => {
                    if (data) {
                        setScoreTypes(data)
                        console.log(data)
                        getColumns(data)
                        check++;
                        if (check == 2) setLoading(false)
                    }
                })
                .catch((error) => console.log(error));
        }

        const getScore = async () => {
            await axios.get('/score/scores', {
                params: {
                    subjectId: menuContext.classId,
                    teacherId: localStorage.getItem('userid'),
                    semesterId: "1"
                }
            })
                .then(data => {
                    console.log(data)
                    if (data != []) {
                        setScores(data)
                        console.log(data)
                        getRows(data.studentsScores)
                        check++
                        if (check == 2) setLoading(false)
                    }
                })
                .catch((error) => console.log(error))
        }

        getScoreTypes();
        getScore();

    }

    const getColumns = (data) => {
        let _columns = []
        for (var i = 0; i < data.length; i++) {
            _columns = [..._columns, {
                field: `score${data[i].scoreTypeId}`, headerName: data[i].scoreTypeName, width: GRADE_COLUMN_WIDTH
            }]
        }
        setColumns([...infoField, ..._columns])
        console.log(_columns)
    }

    const getRows = (data) => {
        let _rows = []
        for (var i = 0; i < data.length; i++) {
            let _scores = {}
            for (var j = 0; j < data[i].scores.length; j++) {
                _scores = { ..._scores, [`score${data[i].scores[j].scoreTypeId}`]: data[i].scores[j].scoreValue }
            }
            _rows = [..._rows, {
                'id': data[i].studentId, 'name': data[i].studentName, ..._scores
            }]
        }
        setRows(_rows)
        console.log(_rows)
    }

    const handleEditClick = () => {
        setEditMode(prev => !prev)
    }

    return {
        loading,
        scoresTypes,
        scores,
        columns,
        rows,
        editMode,
        handleEditClick,
        fetchGradeDetail
    };
}
