import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className= "Welcome">
          Welcome to Solar Neighborhood!
        </p>
        
        <img src={logo} className="App-logo" alt="logo" />
        <p className= "Text">
          Are you a:
        </p>
        <button className="Homepage-buttons" role= "button">
          Consumer
        </button>
        <button className= "Homepage-buttons" role= "button">
          Company
        </button>
      </header>
    </div>
  );
}

export default App;
