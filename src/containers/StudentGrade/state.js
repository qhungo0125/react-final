import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MenuContext } from '../../context/MenuContext.jsx';
import { GradeAPI } from '../../api/grade.js';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';


export default function useGradeStructure() {
    const navigate = useNavigate();
    const [gradeStructure, setGradeStructure] = React.useState([])
    const [scores, setScores] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [rows, setRows] = React.useState([]);
    const [overAll, setOverAll] = React.useState(0)
    const { classId } = useParams();

    const menuContext = React.useContext(MenuContext);

    const { t } = useTranslation();

    const columns = [
        { field: 'type', headerName: t("label.composition"), width: '250' },
        { field: 'percentage', headerName: t('label.percentage'), width: '150' },
        { field: 'grade', headerName: t('label.grade'), width: '150' },
    ]

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch score types
            const scoreTypesResponse = await GradeAPI.getTypes();
            if (!scoreTypesResponse.success) {
                throw new Error("Error fetching score types");
            }

            setGradeStructure(scoreTypesResponse.data);

            // Fetch student scores after setting grade structure
            const studentScoresResponse = await GradeAPI.getStudentScore(localStorage.getItem("userid"))
            if (!studentScoresResponse.success) {
                throw new Error("Error fetching student scores");
            }

            getRows({ types: scoreTypesResponse.data, scores: studentScoresResponse.data });
            setScores(studentScoresResponse.data)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    const getRows = ({ types, scores }) => {
        console.log(types, scores)
        let temp_rows = []
        let over_all = 0;
        const userId = localStorage.getItem('userid')
        for (var i = 0; i < types.length; i++) {
            //set score
            if (types[i].class._id === classId && types[i].isPublish == true) {
                let score = scores.filter(item => item.type && item.type._id === types[i]._id && item.student._id === userId)
                let grade = ''
                if (score.length > 0) {
                    grade = score[0].value
                }
                temp_rows = [...temp_rows, {
                    id: `${types[i]._id}`, type: types[i].name, percentage: types[i].percentage, grade: grade
                }]
                if (grade !== '') {
                    over_all += grade * types[i].percentage;
                }

            }
        }
        setRows(temp_rows)
        setOverAll(over_all)
    }

    return {
        loading,
        gradeStructure,
        columns,
        rows,
        overAll,
        scores,
        fetchData
    };
}
