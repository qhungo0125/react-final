import axios from '../utils/axiosConfig';

export const GradeAPI = {
    getClassScore: async (classId) => {
        const res = await axios.get('/score/scores-final', {
            params: {
                classId: classId,
            }
        })
        return res
    },
    getTypes: async () => {
        const res = await axios.get('/score/types');
        return res
    },
    getStudentScore: async (studentId) => {
        const res = await axios.get('/score/student-scores', {
            params: { studentId: studentId }
        });
        return res
    }

}