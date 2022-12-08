import { Route, Routes, Link } from 'react-router-dom';
import { OnusElementsProvider, GetElement } from '@onus-elements/react';
import styles from './app.module.css';
import Home from './pages/Home';
import Page2 from './pages/Page2';
import Nested from './pages/Nested';

export function App() {
  return (
    <OnusElementsProvider>
      <h1>
        <GetElement name="header" />
      </h1>
      <div className={styles.breadcrumb}>
        <GetElement name="breadcrumb" />
      </div>
      <div role="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/page-2">Page 2</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/page-2" element={<Page2 />}>
          <Route
            path="nested"
            element={<Nested key="nested" name="nested" />}
          />
          <Route
            path="custom"
            element={<Nested key="custom" name="custom" />}
          />
          <Route path="third" element={<Nested key="third" name="third" />} />
        </Route>
      </Routes>
    </OnusElementsProvider>
  );
}

export default App;
