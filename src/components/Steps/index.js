import React from 'react';
import Step from './Step';
import {fetchSteps} from '../../services/stepsApi';
import './index.css';

class Steps extends React.Component {
  constructor() {
    super();
    this.state = {
      steps: [],
      errorStatus: ''
    }
  }

  async componentDidMount() {
    try {
      const data = await fetchSteps();
      console.log(data)
      this.setState({steps: data});
    } catch(err) {
      this.setState({errorStatus: err.message});
    }
  }

  render() {
    const {steps} = this.state;
    return (
      <div id="steps-container" className="content-container">
        <h2>How It Works</h2>
        <div id="steps">
          {steps.map((obj) => {
            return (
              <Step key={obj.stepNumber} step={obj} />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Steps;
