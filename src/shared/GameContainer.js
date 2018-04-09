import React from 'react';
import Game from './Game';
import Axios from 'axios';
import store from './reduxStore';

var API_URL = "https://dog.ceo/";

function randomIntFromInterval(min,max){
  return Math.floor(Math.random()*(max-min+1)+min);
}

let initialState = {
  results: {}, 
  allBreeds:{},
  name: "", 
  currentGame: {
    step: false, 
    initing: false,
    quiz: [
      {options: [], correct: "", imageURL: ""},
      {options: [], correct: "", imageURL: ""},
      {options: [], correct: "", imageURL: ""},
      {options: [], correct: "", imageURL: ""},
      {options: [], correct: "", imageURL: ""}
    ]
  }
}

function initGame(){

  let quiz = {};
  quiz = initialState.currentGame.quiz.slice();

  const allBreeds = store.getState().allBreeds;

  if(allBreeds){

    for(let i = 0; i < 5; i++){
      quiz[i].options = Object.keys(store.getState().allBreeds).sort( function() { return 0.5 - Math.random() } ).slice(0, 5);
      quiz[i].correct = quiz[i].options[randomIntFromInterval(0,4)];
    
      Axios.get(API_URL + 'api/breed/' + quiz[i].correct + '/images/random')
        .then(
          (response) => { 
            store.dispatch({type: 'SaveImage', payload: response.data.message, index: i});
          },
          (failure) => {console.log(failure)}
        )
    }

    store.dispatch({type: "SetStep", payload: 0});
    store.dispatch({type: "SaveGame", payload: quiz});
  }


}

class GameContainer extends React.Component {

  constructor(props){
    super(props);
    this.startGame = this.startGame.bind(this);
  }

  startGame(){
    initGame();
  }

  componentDidMount(){

    Axios.get(API_URL + 'api/breeds/list/all')
      .then( 
        (response) => { 
          store.dispatch({type: 'SaveBreeds', payload: response.data.message})
        },
        (failure) => {console.log(failure)}
      );

  }

	render(){
    return <Game startGame={this.startGame} />
	}

}

export default GameContainer;