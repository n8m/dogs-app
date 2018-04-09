import { createStore } from 'redux';

function gameReducer(state = {results: {}, currentGame: {step: false, quiz: [], initing: false}, name: ''}, action){

  let newState = {};

  Object.assign(newState, state);

  if(action.type === "SaveBreeds"){
    newState.allBreeds = action.payload;
  }

  if(action.type === "SaveName"){
    newState.name = action.payload;
    newState.results[action.payload] = {correct: 0, lastStepAnswered: 0};
  }

  if(action.type === "SaveGame"){
    newState.currentGame.quiz = action.payload;
  }

  if(action.type === "SaveImage"){
    newState.currentGame.quiz[action.index].imageURL = action.payload;
    newState.currentGame.quiz[action.index].loaded = true;
  }

  if(action.type === "SaveAnswer"){

    newState.results[action.payload.name].lastStepAnswered = action.payload.stepAnswered;
    
    if(action.payload.correct){
      newState.results[action.payload.name].correct++;
    }

    if(newState.currentGame.step === 4){
	  newState.currentGame.step = true;  
	}else{
      newState.currentGame.step++;
    }

  }

  if(action.type === "SetStep"){
    newState.currentGame.step = action.payload;
  }

  if(action.type === "ClearName"){
  	newState.name = '';
  }

  if(action.type === "ClearGame"){
  	newState.currentGame = {
  		step: false,
  		options: []
  	};
  }

  return newState;
}

const store = createStore(gameReducer);

export default store;