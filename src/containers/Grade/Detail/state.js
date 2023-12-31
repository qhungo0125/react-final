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
            await axios.get('/score/class-scores', {
                params: {
                    classId: menuContext.classId,
                }
            })
                .then(res => {
                    console.log(res.data)
                    if (res.success) {
                        setScores(res.data)
                        getRows(res.data)
                        check++
                        if (check == 2) setLoading(false)
                    }
                })
                .catch((error) => {
                    setLoading(false)
                    console.log(error)
                })
        }

        getScoreTypes();
        getScore();

    }

    const getColumns = (data) => {
        let _columns = []
        for (var i = 0; i < data.length; i++) {
            _columns = [..._columns, {
                field: `score${data[i]._id}`, headerName: data[i].name, width: GRADE_COLUMN_WIDTH
            }]
        }
        setColumns([...infoField, ..._columns])
        console.log(_columns)
    }

    const getRows = (data) => {
        //set table rows
        let _rows = []
        for (var i = 0; i < data.length; i++) {
            // let _scores = {}
            // for (var j = 0; j < data[i].scores.length; j++) {
            //     _scores = { ..._scores, [`score${data[i].scores[j].scoreTypeId}`]: data[i].scores[j].scoreValue }
            // }
            // _rows = [..._rows, {
            //     'id': data[i].student._id, 'name': data[i].student.name, ..._scores
            // }]

            //check if existed student
            let isExisted = false
            for (var j = 0; j < _rows.length; j++) {
                if (_rows[j].id === data[i].student._id) {
                    _rows[j] = { ..._rows[j], [`score${data[i].type._id}`]: data[i].value }
                    isExisted = true
                    break
                }
            }
            if (!isExisted) {
                _rows = [..._rows, {
                    'id': data[i].student._id, 'name': data[i].student.name, [`score${data[i].type._id}`]: data[i].value
                }]
            }

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
