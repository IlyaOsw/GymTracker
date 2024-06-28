import React, { forwardRef, ChangeEvent } from "react";

import { NumericInputProps } from "../../../../types/types";

import styles from "./NumericInput.module.scss";

const NumericInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  NumericInputProps
> = ({ value, onChange, onBlur }, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
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
    />
  );
};

export default forwardRef(NumericInput);
