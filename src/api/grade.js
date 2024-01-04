import axios from '../utils/axiosConfig';

export const GradeAPI = {
  getClassScore: async (classId) => {
    const res = await axios.get('/score/scores-final', {
      params: {
        classId: classId,
      },
    });
    return res;
  },
};
