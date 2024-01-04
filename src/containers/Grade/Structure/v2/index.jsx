import React from 'react';
import {
  getClassScoreTypes,
  getScoreTypes,
} from '../../../../api/scoreStructure';
import { useSearchParams } from 'react-router-dom';
import AddForm from './AddForm';

const GradeStructure = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [types, setTypes] = React.useState([]);
  const [classTypes, setClassTypes] = React.useState([]);
  const [openAddForm, setOpenAddForm] = React.useState(false);
  React.useEffect(() => {
    const getData = async () => {
      const classId = searchParams.get('id');
      const [classTypes, types] = await Promise.all([
        getClassScoreTypes({ classId }),
        getScoreTypes(),
      ]);
      setTypes(types.data);
      setClassTypes(classTypes.data);
    };
    getData();
  }, []);
  return (
    <div>
      <button onClick={(e) => setOpenAddForm(true)} className='btn btn-success'>
        Add a grade structure
      </button>
      {openAddForm && (
        <AddForm scoreTypes={types} onClose={() => setOpenAddForm(false)} />
      )}
    </div>
  );
};

export default GradeStructure;
