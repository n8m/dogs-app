import React from 'react';
import {connect} from 'react-redux';

class Greetings extends React.Component {

  render() {

    return (
      <div style={{textAlign: 'center'}}>
		    <h2 style={{fontSize: '36px',margin:'0'}}>
    	  	Hi, {this.props.store.name }!
  		  </h2>
        <a onClick={this.props.clearName} style={{color:'blue', cursor:'pointer'}}>change name</a>
      </div>
    )
  }
}

export default connect(
  state => ({
  	store: state
  }),
  dispatch => ({
    clearName: () => dispatch({type: "ClearName"})
  })
)(Greetings);