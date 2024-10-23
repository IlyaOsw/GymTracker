import React, { useState } from "react";

import { Exercise, ExerciseCardPropsType } from "../../../../types/types";

import { CardOptions } from "./CardOptions/CardOptions";
import { DeleteIcon } from "./DeleteIcon/DeleteIcon";
import { EditInput } from "./EditInput/EditInput";
import styles from "./ExerciseCard.module.scss";

export const ExerciseCard: React.FC<ExerciseCardPropsType> = ({
  item,
  onSelectExercise,
  category,
  setData,
  setLoading,
  activeCardId,
  setActiveCardId,
  index,
  exercisesRef,
  setSelectedExercise,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleCancel = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  const handleCardClick = (item: Exercise) => {
    setActiveCardId(item.id);
    onSelectExercise(item);
  };

  return (
    <div
      className={`${styles.cardItem} ${
        activeCardId === item.id ? styles.active : ""
      }`}
      onClick={() => handleCardClick(item)}
      ref={exercisesRef}
    >
      <DeleteIcon
        setLoading={setLoading}
        setIsModalOpen={setIsModalOpen}
        category={category}
        setData={setData}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        item={item}
        index={index}
        setSelectedExercise={setSelectedExercise}
      />
      {currentEditingId === item.id && editMode ? (
        <EditInput
          newName={newName}
          editMode={editMode}
          currentEditingId={currentEditingId}
          setCurrentEditingId={setCurrentEditingId}
          category={category}
          setData={setData}
          setEditMode={setEditMode}
          setNewName={setNewName}
        />
      ) : (
        <div className={styles.exerciseContainer}>
          <span className={styles.exerciseName}>{item.name}</span>
        </div>
      )}
      <CardOptions
        item={item}
        category={category}
        setData={setData}
        setCurrentEditingId={setCurrentEditingId}
        setNewName={setNewName}
        editMode={editMode}
        setEditMode={setEditMode}
      />
    </div>
  );
};
