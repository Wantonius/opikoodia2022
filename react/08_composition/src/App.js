import ContactCard from './components/ContactCard';
import NamedChildren from './components/NamedChildren';
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
		<NamedChildren
			header={<h2>Complex Contact Card</h2>}
			media={<h3>Media content here</h3>}
			content={<h3>Actual content here</h3>}
			/>
		<NamedChildren
			header={<h2>No Media Card </h2>}
			content={<h3>Content here</h3>}
			/>
    </div>
  );
}

export default App;
