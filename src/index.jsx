import { render } from 'react-dom';
import { hot } from 'react-hot-loader/root'
import Example from './components/Example';

const root = document.getElementById('root');
const App = () => render(<Example />, document.getElementById('root'));

export default hot(App);
App();