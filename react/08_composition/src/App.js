import ContactCard from './components/ContactCard';
import './App.css';

function App() {
  return (
    <div className="App">
		<ContactCard>
			<h3>Simple Contact Card</h3>
		</ContactCard>
		<ContactCard>
			My Card
		</ContactCard>
    </div>
  );
}

export default App;
