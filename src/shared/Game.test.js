import React from 'react';
import ReactDOM from 'react-dom';
import Game from './Game';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';


const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Enzyme.configure({ adapter: new Adapter() });

function setup(store) {

  const props = {};
  const enzymeWrapper = mount(<Provider store={store}><Game/></Provider>);

  return {
    props,
    enzymeWrapper
  }
}

it('Renders with set name', () => {

	const store = mockStore(
		{
			name: "Some Name",
			currentGame:{
				step: false,
				quiz: []
			}
		}
	)

    const { enzymeWrapper } = setup(store);

    const button = enzymeWrapper.find('button').text();
    expect(button).toBe("Start Game");

    const greeting = enzymeWrapper.find('h2').text();
    expect(greeting).toBe("Hi, Some Name!");

});


it('with name unset', () => {

	const store = mockStore(
		{
			name: false,
			currentGame:{
				step: false,
				quiz: []
			}
		}
	)

    const { enzymeWrapper } = setup(store);

    const section = enzymeWrapper.find('h1').text();
    expect(section).toBe("Tell us your name");

    const buttonExistment = enzymeWrapper.find('button').exists();
    expect(buttonExistment).toBeFalsy();

});

it('renders quiz on the first step', () => {

	const store = mockStore(
		{
			name: "Some Name",
			currentGame:{
				step: 0,
				quiz: [{imageUrl: ""}]
			}
		}
	)

    const { enzymeWrapper } = setup(store);

    const buttonExistment = enzymeWrapper.find('button').exists();
    expect(buttonExistment).toBeFalsy();

});