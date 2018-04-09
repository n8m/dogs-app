import React, { Component } from 'react'
import routes from './routes'
import { Route, Switch } from 'react-router-dom'
import NoMatch from './NoMatch'
import store from './reduxStore';
import {Provider} from 'react-redux';


class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <Switch>
            {routes.map(({ path, exact, component: Component, ...rest }) => (
              <Route key={path} path={path} exact={exact} render={(props) => (
                <Component {...props} {...rest} />
              )} />
            ))}
            <Route render={(props) => <NoMatch {...props} /> } />
          </Switch>
        </Provider>
      </div>
    )
  }
}

export default App