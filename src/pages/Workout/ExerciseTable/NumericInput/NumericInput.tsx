import React, { forwardRef, ChangeEvent } from "react";

import { NumericInputProps } from "../../../../types/types";

import styles from "./NumericInput.module.scss";

const NumericInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  NumericInputProps
> = ({ value, onChange, onBlur }, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
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
      type="number"
    />
  );
};

export default forwardRef(NumericInput);
