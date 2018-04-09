import React from 'react';


class NamePicker extends React.Component {
  render() {
    return (
      <form onSubmit={this.props.submitName} style={{textAlign: 'center',marginTop:'100px'}}>
      	<h1 style={{fontSize: '36px'}}>Tell us your name</h1>
      	<input autoFocus placeholder="Your Name" style={{height: '40px', fontSize: '22px', borderRadius: '5px', padding: '5px', border: '1px solid darkgrey'}}/>
      </form>
    )
  }
}

export default NamePicker;