import React from "react";

interface OutputProps {
  value: string;
  result: number | "";
}

export default function Output({ value, result }: OutputProps) {
  return (
    <div className="output-container">
      <div className="value-display">{value}</div>
      <div className="value-display result-display">
        {result && `= ${result}`}
      </div>
    </div>
  );
}
