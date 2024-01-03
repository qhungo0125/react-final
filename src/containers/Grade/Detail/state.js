import React from 'react';
import useSWRMutation from 'swr/mutation';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axiosConfig';
import { infoField } from './gradeConfig.js'
import { useState } from 'react';
import { MenuContext } from '../../../context/MenuContext';
import { getClass } from '../../../api/class.js';


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
            await axios.get('/score/types')
                .then(res => {
                    if (res.success) {
                        setScoreTypes(res.data)
                        getColumns(res.data)
                        check++;
                        if (check == 2) setLoading(false)
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error)
                })

        }

        const getScore = async () => {
            await axios.get('/score/scores-final', {
                params: {
                    classId: menuContext.classId,
                }
            })
                .then(res => {
                    if (res.success) {
                        setScores(res.data)
                        getRows(res.data[0]["scoreBoard"])
                        check++
                        if (check == 2) setLoading(false)
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error)
                })
        }

        getScore();
        getScoreTypes();
    }


    const getColumns = (data) => {
        let _columns = []
        for (var i = 0; i < data.length; i++) {
            _columns = [..._columns, {
                field: `${data[i]._id}`, headerName: data[i].name, width: GRADE_COLUMN_WIDTH
            }]
        }
        setColumns([...infoField, ..._columns])
    }

    const getRows = (data) => {
        console.log(data)
        //set table rows
        let _rows = []
        for (var i = 0; i < data.length; i++) {
            let _scores = {}
            for (var j = 0; j < data[i].scores.length; j++) {
                _scores = { ..._scores, [`${data[i].scores[j].typeId}`]: data[i].scores[j].value }
            }
            _rows = [..._rows, {
                'id': data[i].student._id, 'student_id': "", 'name': data[i].student.name, ..._scores
            }]
        }
        setRows(_rows)
        console.log(_rows)
    }

    const handleEditMode = () => {
        setEditMode(prev => !prev)
    }

    return {
        loading,
        scoresTypes,
        scores,
        columns,
        rows,
        editMode,
        handleEditMode,
        fetchGradeDetail
    };
}
