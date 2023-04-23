import logo from './logo.svg';
import './App.css';
import Club from "./Club";
import ScrollElement from './ScrollElement';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Club id="11" title="ski clubs" body="a fun club where people get together and do blow" url="https.www.gogle.com"/>
        <ScrollElement title = "scrollTest"></ScrollElement>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
