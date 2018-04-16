import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  // <Hello name="TypeScript" enthusiasmLevel={10} />,
  <App name="Eugene" />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
