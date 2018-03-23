/* eslint-disable import/no-extraneous-dependencies */
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Example from './components/Example';

const root = document.getElementById('root');

const load = () => render((
  <AppContainer>
    <Example />
  </AppContainer>
), document.getElementById('root'));

if (module.hot) {
  module.hot.accept('./components/Example', load);
}

load();