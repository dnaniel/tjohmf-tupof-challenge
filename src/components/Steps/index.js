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
      <div id="steps" className="content-container">
        {steps.map((obj) => {
          return (
            <Step key={obj.stepNumber} step={obj} />
          );
        })}
      </div>
    );
  }
}

export default Steps;
