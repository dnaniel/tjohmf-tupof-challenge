import React from 'react';

function Step(props) {
  return (
    <div className="step">
      <span className="bigNumber">{props.step.stepNumber}</span>
      <h3>{props.step.title}</h3>
    </div>
  );
}

export default Step;