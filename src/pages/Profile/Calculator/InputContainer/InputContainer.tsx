import { ConfigProvider, Input, message } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  MinusOutlined,
  PlusOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

import { CustomButton } from "../../../../components/CustomButton/CustomButton";
import { InputContainerPropsType } from "../../../../types/types";

import styles from "./InputContainer.module.scss";

export const InputContainer: React.FC<InputContainerPropsType> = ({
  reps,
  setReps,
  setResult,
  weight,
  setWeight,
}) => {
  const { t } = useTranslation();
  const [, contextHolder] = message.useMessage();

  const increment = () => {
    if (reps < 15) {
      setReps(reps + 1);
    } else {
      message.warning({
        key: "limit-warning",
        content: t("noMoreThan15reps"),
      });
    }
  };

  const decrement = () => {
    if (reps > 2) {
      setReps(reps - 1);
    } else {
      message.warning({
        key: "limit-warning",
        content: t("noLessThan2reps"),
      });
    }
  };

  const calculate1RM = () => {
    if (!weight.trim()) {
      message.error({
        key: "limit-error",
        content: t("enterWorkingWeight"),
      });
      return;
    } else if (Number(weight) < 10) {
      message.warning({
        key: "limit-warning",
        content: t("noLessThan10kg"),
      });
      setWeight("");
      setResult(0);
      return;
    }
    const weightToNum = Number(weight);
    const oneRM_Epley = (weightToNum * reps) / 30 + weightToNum;
    const oneRM_Brzycki = weightToNum * (36 / (37 - reps));
    const average = ((Number(oneRM_Epley) + Number(oneRM_Brzycki)) / 2).toFixed(
      1
    );
    setResult(Number(average));
  };

  const handleChange = (e: { target: { value: string } }) => {
    let value = e.target.value;
    value = value.replace(",", ".");
    const numericValue = parseFloat(value);

    if (numericValue > 1000) {
      message.warning({
        key: "limit-warning",
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
      <ConfigProvider
        theme={{
          components: {
            Message: {
              contentBg: "red",
            },
          },
        }}
      >
        {contextHolder}
      </ConfigProvider>
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
          <button className={styles.plusMinus} onClick={decrement}>
            <MinusOutlined />
          </button>
          <div className={styles.repsNumber}>{reps}</div>
          <button className={styles.plusMinus} onClick={increment}>
            <PlusOutlined />
          </button>
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
};
