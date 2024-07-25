import React, { forwardRef, ChangeEvent } from "react";

import { NumericInputProps } from "../../types/types";

import styles from "./NumericInput.module.scss";

const NumericInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  NumericInputProps
> = ({ value, onChange, onBlur }, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(",", ".");
    if (/^\d*\.?\d?$/.test(value)) {
      onChange(value);
    }
  };

  return (
    <input
      ref={ref}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      className={styles.input}
      type="text"
      inputMode="decimal"
      pattern="[0-9]*[.,]?[0-9]*"
    />
  );
};

export default forwardRef(NumericInput);
