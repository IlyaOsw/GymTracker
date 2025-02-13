import React, { forwardRef, ChangeEvent } from "react";

import { INumericInputProps } from "../../types/components/numeric-input";

import styles from "./NumericInput.module.scss";

const NumericInput: React.ForwardRefRenderFunction<
  HTMLInputElement,
  INumericInputProps
> = ({ value, onChange, onBlur, className, placeholder }, ref) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(",", ".");

    if (value.length > 1 && value.startsWith("0") && !value.startsWith("0.")) {
      value = value.substring(1);
    }

    const match = value.match(/^\d*\.?\d{0,2}/);
    if (match) {
      onChange(match[0]);
    }
  };

  return (
    <input
      ref={ref}
      value={value}
      onChange={handleChange}
      onBlur={onBlur}
      className={`${styles.input} ${className}`}
      type="text"
      inputMode="decimal"
      pattern="[0-9]*[.,]?[0-9]*"
      placeholder={placeholder}
    />
  );
};

export default forwardRef(NumericInput);
