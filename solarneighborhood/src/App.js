import logo from './icons/logo.png';
import './App.css';
import {Questionnaire} from './Questionnaire.ts';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className= "Welcome">
          Welcome to Solar Neighborhood!
        </p>
      </header>
        <img src={logo} className="App-logo" alt="logo" />
        <p className= "Text">
          Are you a:
        </p>
        <button className="Homepage-buttons" role= "button" onClick= {() => {
            console.log("Question");
            var q = new Questionnaire();
            q.Questions();
            console.log("Created");
            }
        }>
          Consumer
        </button>
        <button className= "Homepage-buttons" role= "button">
          Company
        </button>
    </div>
  );
}

export default App;
