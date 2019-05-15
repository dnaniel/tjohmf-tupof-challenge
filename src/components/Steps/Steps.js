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
      this.setState({ steps: data });
    } catch(err) {
      this.setState({ errorStatus: err.message });
    }
  }

  render() {
    const { errorStatus } = this.state;
    return (
      <div id="steps-container" className="content-container">
        <h2>How It Works</h2>
        <div id="steps">
          { errorStatus ? this.renderError() : this.renderSteps() }
        </div>
      </div>
    );
  }

  renderSteps() {
    return this.state.steps.map((obj) => {
      return (
        <Step key={obj.stepNumber} step={obj} />
      );
    });
  }
  
  renderError() {
    return (
      <strong>Error retrieving steps: {this.state.errorStatus}</strong>
    )
  }
}

export default Steps;
