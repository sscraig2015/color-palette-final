
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  const [data, setData] = useState()
  console.log(data)

  useEffect(() => {

    const options = {
      method: 'POST',
      body: JSON.stringify({ 	
        model : "default",
        input : ["N","N","N","N","N"]})
    }
    fetch(`http://colormind.io/api/`, options)
      .then((r) => r.json())
      .then((data) => setData(data))
  }, [])
  
  return (
    <div>hello</div>
  );
}

export default App;
