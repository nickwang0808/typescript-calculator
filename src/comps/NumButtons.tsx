import React from "react";
import {
  UserActionTypes,
  NumberTypes,
  OperatorsTypes,
  NumberArray,
  OperatorsArray,
} from "../App";

type CalculatorKeysType = OperatorsTypes | NumberTypes | UserActionTypes;
// type CalculatorKeysType = any;

interface CalculatorOperators {
  operator: CalculatorKeysType;
  setCurrentOperator: (args: any) => void;
  setCurrentNumber: (args: "" | ((args2: string) => string)) => void;
  setPrevNumber: (args: string) => void;
  currentOperator: string;
  currentNumber: string;
  handleClear: () => void;
  handleEqual: () => void;
}

export default function NumButtons({
  operator,
  currentOperator,
  setCurrentOperator,
  setCurrentNumber,
  setPrevNumber,
  currentNumber,
  handleClear,
  handleEqual,
}: CalculatorOperators) {
  const handleButtonClick = (input: CalculatorKeysType) => {
    if (input === "=") {
      handleEqual();
      return;
    }

    if (input === "C") {
      handleClear();
      return;
    }

    if (input === "<") {
      if (currentNumber !== "") {
        setCurrentNumber((prev) => prev.slice(0, -1));
      } else if (currentOperator !== "") {
        setCurrentOperator("");
      }

      return;
    }

    if (NumberArray.includes(input as NumberTypes) === true) {
      setCurrentNumber((prev: string) => String(prev) + input);
      return;
    }

    if (OperatorsArray.includes(input as OperatorsTypes)) {
      setCurrentOperator(input);
      setPrevNumber(currentNumber);
      setCurrentNumber("");
      return;
    }
  };

  return (
    <button
      // style={operator === "=" ? { height: 200 } : { flex: 0 }}
      onClick={() => handleButtonClick(operator as CalculatorKeysType)}
    >
      {operator}
    </button>
  );
}
