import {useState} from 'react';

const useCount = (initialState = 0) => {
	
	const [value,setValue] = useState(initialState);

	const add = () => setValue(value => value +1);
	
	const substract = () => setValue(value => value -1);
	
	return [value,add,substract];
}

export default useCount;