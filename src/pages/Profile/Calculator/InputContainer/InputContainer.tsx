import { Input } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MinusOutlined,
  PlusOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import { CustomButton } from "components/CustomButton/CustomButton";
import { InputContainerPropsType } from "types/input-container";
import { ClosableMessage } from "components/ClosableMessage/ClosableMessage";

import styles from "./InputContainer.module.scss";

export const InputContainer: React.FC<InputContainerPropsType> = React.memo(
  ({ reps, setReps, setResult, weight, setWeight }) => {
    const { t } = useTranslation();

    const increment = () => {
      if (reps < 15) {
        setReps(reps + 1);
      } else {
        ClosableMessage({ type: "warning", content: t("noMoreThan15reps") });
      }
    };

    const decrement = () => {
      if (reps > 2) {
        setReps(reps - 1);
      } else {
        ClosableMessage({ type: "warning", content: t("noLessThan2reps") });
      }
    };

    const calculate1RM = () => {
      if (!weight.trim()) {
        ClosableMessage({ type: "error", content: t("enterWorkingWeight") });
        return;
      } else if (Number(weight) < 10) {
        ClosableMessage({ type: "warning", content: t("noLessThan10kg") });
        setWeight("");
        setResult(0);
        return;
      }
      const weightToNum = Number(weight);
      const oneRM_Epley = (weightToNum * reps) / 30 + weightToNum;
      const oneRM_Brzycki = weightToNum * (36 / (37 - reps));
      const average = (
        (Number(oneRM_Epley) + Number(oneRM_Brzycki)) /
        2
      ).toFixed(1);
      setResult(Number(average));
    };

    const handleChange = (e: { target: { value: string } }) => {
      let value = e.target.value;
      value = value.replace(",", ".");
      const numericValue = parseFloat(value);

      if (numericValue > 1000) {
        ClosableMessage({
          type: "warning",
          content: t("noMoreThan1000kg"),
        });
      } else if (!isNaN(numericValue) && /^\d*\.?\d*$/.test(value)) {
        setWeight(value);
      } else {
        setWeight("");
      }
    };

    return (
      <div className={styles.calculator}>
        <div className={styles.block}>
          <div className={styles.subtitle}>{t("workingWeight")}</div>
          <Input
            className={styles.weight}
            allowClear
            placeholder={t("weightKg")}
            value={weight}
            type="text"
            inputMode="decimal"
            pattern="[0-9]*[.,]?[0-9]*"
            onChange={handleChange}
          />
        </div>
        <div className={styles.block}>
          <div className={styles.subtitle}>{t("repsNumber")}</div>
          <div className={styles.reps}>
            <CustomButton className={styles.plusMinus} onClick={decrement}>
              <MinusOutlined />
            </CustomButton>
            <div className={styles.repsNumber}>{reps}</div>
            <CustomButton className={styles.plusMinus} onClick={increment}>
              <PlusOutlined />
            </CustomButton>
          </div>
        </div>
        <div className={styles.calculateWrapper}>
          <CustomButton
            children={t("calculate")}
            className={styles.calculate}
            onClick={calculate1RM}
            icon={<RightCircleOutlined />}
          />
        </div>
      </div>
    );
  }
);
