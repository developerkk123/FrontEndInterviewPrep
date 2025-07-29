import logo from './logo.svg';
// import Closure from './component/Closure/Closure';
import './App.css';
import Callback from './component/Callback/Callback';
import CustomHook from './component/CustomHook/CustomHook';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      {/* <Callback /> */}
      <CustomHook />
    </div>
  );
}

export default App;
