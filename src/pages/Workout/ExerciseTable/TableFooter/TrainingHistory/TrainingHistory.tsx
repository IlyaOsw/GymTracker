import React from "react";

import { CustomButton } from "../../../../../components/CustomButton/CustomButton";
import { scrollToBottom } from "../../../../../utils/scrollToBottom";
import { TrainingHistoryPropsType } from "../../../../../types/types";

export const TrainingHistory: React.FC<TrainingHistoryPropsType> = ({
  historyButton,
  showHistory,
  setShowHistory,
  workouts,
  workoutDates,
}) => {
  const toggleHistoryList = () => {
    setShowHistory((prev: boolean) => !prev);
    scrollToBottom();
  };

  return (
    <>
      {historyButton && (
        <CustomButton onClick={toggleHistoryList}>
          {showHistory ? "HIDE HISTORY" : "SHOW HISTORY"}
        </CustomButton>
      )}
      {showHistory && workouts.length > 0 && (
        <div>
          {workoutDates
            .slice()
            .reverse()
            .map((date, index) => (
              <div key={index}>
                {`${date}: ${workouts[index]
                  .map(
                    (w) => `Set: ${w.set}, Weight: ${w.weight}, Reps: ${w.reps}`
                  )
                  .join(", ")}`}
              </div>
            ))}
        </div>
      )}
    </>
  );
};
