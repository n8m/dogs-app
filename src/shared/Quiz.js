import React from 'react';
import CurrentStep from './CurrentStep';
import {connect} from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

class Quiz extends React.Component {

    constructor(props){
        super(props);
        this.checkAnswer = this.checkAnswer.bind(this);
    }    

    checkAnswer(e){

        const step = this.props.store.currentGame.step;

        if(e.target.innerText === this.props.store.currentGame.quiz[step].correct){
            this.props.saveAnswer({stepAnswered: step, correct: true, name: this.props.store.name});
        }else{
            this.props.saveAnswer({stepAnswered: step, correct: false, name: this.props.store.name});
        }

        console.log(this.props.store.results);

    }

    render() {

        const quiz = this.props.store.currentGame.quiz;
        const user = this.props.store.name;
        const step = this.props.store.currentGame.step;
        let choices;
        let isQuizFinished = false;

        if(step === true){
            isQuizFinished = true;
        }else{

            if(!quiz[step].imageURL){
                return "<h1 style={{textAlign: 'center'}}>Loading</h1>";
            }

            choices = (step !== true) ? quiz[step].options.map( (option, index) => (<li key={index}><button className="option-button" onClick={this.checkAnswer}>{option}</button></li>)) : "";

        }

        const GoToResultsButton = withRouter(
          ({ history }) =>
            <button className="main-button"
              onClick={() => {
                history.push("/results/" + this.props.store.name);
              }}
            >Check Results</button>
        );


        return (
            <div>
                {step !== true ? (
                    <div style={{textAlign: 'center'}}>
                        {step !== true ? <CurrentStep step={step} /> : ''}
                        <br /><br />
                        <img style={{maxHeight:'450px'}} src={quiz[step].imageURL} />

                        {step !== null ? (
                            <ul style={{display: 'inline-block',listStyle: 'none', verticalAlign: 'top'}}>
                                {choices}
                            </ul>
                        ) : ""}
                    </div>
                ) : ''}

                {step === true ? (<div style={{textAlign:'center'}}><h2>{step}Test is finished</h2><GoToResultsButton /></div>) : ''}

            </div>
        )
    }
}

export default connect(
  state => ({
    store: state
  }),
  dispatch => ({
    saveAnswer: (answer) => dispatch({type: 'SaveAnswer', payload: answer}),

  })
)(Quiz);