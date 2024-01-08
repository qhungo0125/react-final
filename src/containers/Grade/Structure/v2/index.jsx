import React from 'react';

import {
  getClassScoreTypes,
  removeType,
  setScoreStructure,
  updateType,
} from '../../../../api/scoreStructure';
import AddForm from './AddForm';
import DraggableList from './StructureDetail';
import EditForm from './EditForm';
import { t } from 'i18next';
import { useParams } from 'react-router-dom';
const GradeStructure = () => {
  const [classTypes, setClassTypes] = React.useState([]);
  const [openAddForm, setOpenAddForm] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState({});
  const { classId } = useParams();

  console.log(openEditForm);

  const fetchData = async () => {
    const classTypes = await getClassScoreTypes({ classId });
    console.log('classTypes', classTypes);
    setClassTypes(classTypes.data);
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
            {t('label.button.add')}
          </button>
        </div>
      </div>
      {openAddForm && (
        <AddForm
          onClose={(e) => {
            setOpenAddForm(false);
          }}
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
