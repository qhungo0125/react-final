import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ScoreStructureItem from './ScoreStructureItem';

const DraggableList = (props) => {
  const { data, onChange, onRemove, setOpenEditForm, setSelectedType } = props;
  // State to manage the order of items

  // Function to handle the drag-and-drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return; // Drop outside the list

    const newItems = [...data];
    const [movedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, movedItem);
    onChange(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th scope='col'>Index</th>
            <th scope='col'>name</th>
            <th scope='col'>percentage</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <Droppable droppableId='droppable'>
          {(provided) => (
            <tbody {...provided.droppableProps} ref={provided.innerRef}>
              {data.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided) => (
                    <ScoreStructureItem
                      setSelectedType={setSelectedType}
                      setOpenEditForm={setOpenEditForm}
                      provided={provided}
                      data={item}
                      index={index}
                      onRemove={onRemove}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </tbody>
          )}
        </Droppable>
      </table>
    </DragDropContext>
  );
};

export default DraggableList;
