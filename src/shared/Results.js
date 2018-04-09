import React from 'react';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class Results extends React.Component {
  render() {
  	const user = this.props.location.pathname.split("/results/")[1]; 
  	const results = this.props.store.results[user] ? <span>Answered Correctly {this.props.store.results[user].correct} OF {this.props.store.results[user].lastStepAnswered + 1}</span> : <span>CRAP</span>;


    const GoToQuiz = withRouter(
      ({ history }) =>
        <button className="main-button"
          onClick={() => {
          	this.props.clearGame();
            history.push("/");
          }}
        >Play Again</button>
        );


    return (
    	<div style={{textAlign: 'center'}}>
			<h1>
				Results for {user}
			</h1>
			{results}
			<br /><br />
			<GoToQuiz />
		</div>
    )
  }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    clearGame: () => dispatch({type: 'ClearGame'})
  })
)(Results);