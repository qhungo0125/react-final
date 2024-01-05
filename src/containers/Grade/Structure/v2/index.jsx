import React from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import {
  getClassScoreTypes,
  getScoreTypes,
  setScoreStructure,
} from '../../../../api/scoreStructure';
import { useSearchParams } from 'react-router-dom';
import AddForm from './AddForm';
import DraggableList from './StructureDetail';

const GradeStructure = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [types, setTypes] = React.useState([]);
  const [classTypes, setClassTypes] = React.useState([]);
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const fetchClassTypes = async ({ classId }) => {
    const classTypes = await getClassScoreTypes({ classId });
    console.log('classTypes', classTypes);
    setClassTypes(classTypes.data);
    return classTypes;
  };

  React.useEffect(() => {
    const getData = async () => {
      const classId = searchParams.get('id');
      const classTypes = await fetchClassTypes({ classId });
      const types = await getScoreTypes();

      // filter scrore types that existed
      const filtered = types.data.filter((type) => {
        return !classTypes.data.find((classType) => {
          return classType.name === type.name;
        });
      });

      setTypes(filtered);
      // setTypes(types.data);
    };
    getData();
  }, []);

  const addGradeStructure = async (params = {}) => {
    const { name, percentage } = params;
    if (!name || !percentage) {
      console.error('Missing name or percentage');
      return;
    }
    const classId = searchParams.get('id');
    try {
      setLoading(true);
      const response = await setScoreStructure({ name, percentage, classId });
      if (response.success) {
        alert('Add grade structure successfully');
        await fetchClassTypes();
      } else {
        alert('Add grade structure failed');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpenAddForm(false);
    }
  };

  return (
    <>
      <div className={openAddForm ? 'w-50 opacity-25' : 'w-50'}>
        <DraggableList data={classTypes} onChange={setClassTypes} />
        <div className='d-flex justify-content-center'>
          <button
            onClick={(e) => setOpenAddForm(true)}
            className='btn btn-success'
          >
            Add new
          </button>
        </div>
      </div>
      {openAddForm && (
        <AddForm
          onClose={(e) => {
            setOpenAddForm(false);
          }}
          scoreTypes={types}
          onSubmit={addGradeStructure}
        />
      )}
    </>
  );
};

export default GradeStructure;
