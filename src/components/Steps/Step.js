import React from 'react';

function Step(props) {
  let numberToShow = props.step.stepNumber;
  if( numberToShow < 10 ){
    numberToShow = '0' + numberToShow;
  }
  return (
    <div className="step">
      <span className="bigNumber">{numberToShow}</span>
      <h3>{props.step.title}</h3>
      <p>{props.step.body}</p>
    </div>
  );
}

export default Step;