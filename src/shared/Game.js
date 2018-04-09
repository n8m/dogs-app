import React from 'react'
import Greetings from './Greetings';
import NamePicker from './NamePicker';
import Quiz from './Quiz';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';

class Game extends React.Component {

	constructor(props){
		super(props);
		this.onSubmitName = this.onSubmitName.bind(this);
	}

	onSubmitName(e){
		e.preventDefault();
		this.props.saveName(e.target.querySelector('input').value);
		e.target.querySelector('input').value = '';
		this.props.clearGame();
	}

	render(){

		const isNameSet = this.props.store.name ? true : false;
		const isGameInProgress = this.props.store.currentGame.step !== false ? true : false;

		return (
			<section>
				{isNameSet ? <Greetings /> : ''}
				{isNameSet ? '' : <NamePicker submitName={this.onSubmitName} />} 
				<div style={{textAlign:'center',padding: '25px'}}>
					{isNameSet && !isGameInProgress ? <button onClick={this.props.startGame} className="main-button">Start Game</button>: ''}
				</div>
				{isNameSet && isGameInProgress ? <Quiz /> : ''} 
			</section>
		)
	}

}

export default connect(
  state => ({
  	store: state
  }),
  dispatch => ({
    saveBreeds: (dogs) => dispatch({type: 'SaveBreeds', payload: dogs}),
    saveName: (name) => dispatch({type: 'SaveName', payload: name}),
    clearGame: () => dispatch({type: 'ClearGame'})
  })
)(Game);