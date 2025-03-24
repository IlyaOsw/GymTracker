import { CalculatorReducerType } from "types/calculators/calculator-reducer";

const initialState: CalculatorReducerType[] = [
  {
    id: "1rm",
    title: "1RMcalc",
    description: "1RMcalcDesc",
    icon: process.env.PUBLIC_URL + "/assets/Icons/Calculators/1rm.svg",
  },
  {
    id: "water",
    title: "waterCalc",
    description: "waterCalcDesc",
    icon: process.env.PUBLIC_URL + "/assets/Icons/Calculators/water.svg",
  },
  {
    id: "bmi",
    title: "BMIcalc",
    description: "BMIcalcDesc",
    icon: process.env.PUBLIC_URL + "/assets/Icons/Calculators/bmi.svg",
  },
];

export const calculatorReducer = (
  state: CalculatorReducerType[] = initialState
) => {
  return state;
};

export const actions = {};
