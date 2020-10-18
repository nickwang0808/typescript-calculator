import React, { useEffect, useState } from "react";
import NumButtons from "./comps/NumButtons";
import Output from "./comps/Output";
import "./App.css";

// prettier-ignore
export type NumberTypes = "1"| "2"| "3"| "4"| "5"| "6"| "7"| "8"| "9"| "0" | ".";
export type OperatorsTypes = "+" | "-" | "*" | "/" | "%";
export type UserActionTypes = "C" | "=" | "<";

// prettier-ignore
export const NumberArray: NumberTypes[] = ["1","2","3","4","5","6","7","8","9","0","."];
export const OperatorsArray: OperatorsTypes[] = ["+", "-", "*", "/", "%"];
export const UserActionsArray: UserActionTypes[] = ["C", "=", "<"];

function App() {
  // prettier-ignore
  const calculatorOperators: Array<
    NumberTypes | OperatorsTypes | UserActionTypes
  > = ["C","/","*","<","7","8","9","-","4","5","6","+","1","2","3","=","%","0",".",];
  const [value, setValue] = useState<string>("");
  const [currentOperator, setCurrentOperator] = useState<OperatorsTypes | "">(
    ""
  );
  const [currentNumber, setCurrentNumber] = useState<string>("");
  const [prevNumber, setPrevNumber] = useState<string>("");
  const [result, setResult] = useState<number | "">("");

  useEffect(() => {
    if (currentOperator !== "" && prevNumber !== "" && currentNumber !== "") {
      const currentNumberToNumber = Number(currentNumber);
      const prevNumberToNumber = Number(prevNumber);
      switch (currentOperator) {
        case "+":
          setResult(currentNumberToNumber + prevNumberToNumber);
          break;
        case "-":
          setResult(prevNumberToNumber - currentNumberToNumber);
          break;
        case "*":
          setResult(currentNumberToNumber * prevNumberToNumber);
          break;
        case "/":
          setResult(prevNumberToNumber / currentNumberToNumber);
          break;
        case "%":
          // more work here
          setResult(currentNumberToNumber / prevNumberToNumber / 100);
          break;
        default:
          break;
      }
    }
    // logic for C and <
    if (currentOperator === "") {
      setResult("");
      // if current is "" then move prev to current
      if (currentNumber === "") {
        setCurrentNumber(prevNumber);
        setPrevNumber("");
      }
    }
    setValue(`${prevNumber} ${currentOperator} ${currentNumber}`);
  }, [currentOperator, prevNumber, currentNumber]);

  const handleClear = () => {
    setPrevNumber("");
    setCurrentOperator("");
    setCurrentNumber("");
  };

  const handleEqual = () => {
    setCurrentNumber(String(result));
    setPrevNumber("");
    setCurrentOperator("");
  };

  return (
    <div className="container">
      <Output value={value} result={result} />
      <div className="button-wrapper">
        {calculatorOperators.map((operator) => (
          <NumButtons
            key={operator}
            operator={operator}
            setCurrentOperator={setCurrentOperator}
            setCurrentNumber={setCurrentNumber}
            setPrevNumber={setPrevNumber}
            currentNumber={currentNumber}
            handleClear={handleClear}
            currentOperator={currentOperator}
            handleEqual={handleEqual}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
