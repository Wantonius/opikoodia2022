import logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld';

function App() {
  return (
    <div className="App">
		<h2>Hello World</h2>
		<HelloWorld/>
		<HelloWorld name="Erno"/>
	</div>
  );
}

export default App;
