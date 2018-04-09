import React from 'react';

class CurrentStep extends React.Component {
  render() {
    return (
      <span>Step {this.props.step + 1} from 5</span>
    )
  }
}

export default CurrentStep;