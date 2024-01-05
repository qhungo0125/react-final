import React from 'react';

import {
  getClassScoreTypes,
  getScoreTypes,
  removeType,
  setScoreStructure,
  updateType,
} from '../../../../api/scoreStructure';
import { useSearchParams } from 'react-router-dom';
import AddForm from './AddForm';
import DraggableList from './StructureDetail';
import EditForm from './EditForm';

const GradeStructure = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [types, setTypes] = React.useState([]);
  const [classTypes, setClassTypes] = React.useState([]);
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState({});

  console.log(openEditForm);

  const fetchData = async () => {
    const classId = searchParams.get('id');
    const classTypes = await getClassScoreTypes({ classId });
    console.log('classTypes', classTypes);
    setClassTypes(classTypes.data);

    const types = await getScoreTypes();

    const filtered = types.data.filter((type) => {
      return !classTypes.data.find((classType) => {
        return classType.name === type.name;
      });
    });

    const validTypes = [];
    filtered.forEach((type) => {
      if (!validTypes.find((validType) => validType.name === type.name)) {
        validTypes.push(type);
      }
    });

    setTypes(validTypes);
  };

  React.useEffect(() => {
    fetchData();
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
        await fetchData();
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

  const removeScoreStructure = async ({ typeId }) => {
    try {
      setLoading(true);
      const response = await removeType({ typeId });
      alert('Remove structure successfully');
      await fetchData();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpenAddForm(false);
    }
  };

  const updateScoreStructure = async ({ name, percentage, typeId }) => {
    try {
      setLoading(true);
      const response = await updateType({ name, percentage, typeId });
      if (response.success) {
        alert('Update structure successfully');
        await fetchData();
      } else {
        alert('Update structure failed');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setOpenEditForm(false);
    }
  };

  return (
    <>
      <div className={openAddForm || openEditForm ? 'w-50 opacity-25' : 'w-50'}>
        <DraggableList
          setSelectedType={setSelectedType}
          setOpenEditForm={setOpenEditForm}
          data={classTypes}
          onRemove={removeScoreStructure}
          onChange={setClassTypes}
        />
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
      {openEditForm && (
        <EditForm
          onSubmit={updateScoreStructure}
          selectedType={selectedType}
          onClose={() => {
            setOpenEditForm(false);
          }}
        />
      )}
    </>
  );
};

export default GradeStructure;
