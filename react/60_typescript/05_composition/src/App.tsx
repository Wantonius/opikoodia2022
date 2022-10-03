import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContactCard from './components/ContactCard';
import NamedChildrenCard from './components/NamedChildren';
function App() {
  return (
    <div className="App">
		<ContactCard>
			Simple Contact Card
		</ContactCard>
		<NamedChildrenCard
			header={<h2>Named card</h2>}
			media={<p>Media area</p>}
			content={<p>Content area</p>}
		/>
		<NamedChildrenCard
			header={<h2>No media</h2>}
			content={<p>Content area</p>}
		/>
   </div>
  );
}

export default App;
