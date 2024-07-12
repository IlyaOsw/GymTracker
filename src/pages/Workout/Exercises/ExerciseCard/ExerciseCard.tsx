import React, { useState } from "react";

import { ExerciseCardPropsType } from "../../../../types/types";

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
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [currentEditingId, setCurrentEditingId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleCancel = (e: any) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div className={styles.cardItem} onClick={() => onSelectExercise(item)}>
      <DeleteIcon
        setLoading={setLoading}
        setIsModalOpen={setIsModalOpen}
        category={category}
        setData={setData}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        item={item}
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
        setEditMode={setEditMode}
      />
    </div>
  );
};
