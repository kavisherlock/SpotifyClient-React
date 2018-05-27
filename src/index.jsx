import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Routes from './routes';
import Reducers from './redux/reducers';
import Sagas from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(Reducers, compose(applyMiddleware(sagaMiddleware)));

Sagas.map(saga => (sagaMiddleware.run(saga)));

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component/>
      </AppContainer>
    </Provider>,
    document.getElementById('app')
  );
};``

renderApp(Routes);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    renderApp(require('./routes').default);
  })
}
