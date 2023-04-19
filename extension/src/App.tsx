import React from 'react';
import './App.css';

function App() {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    fetch('https://swapi.dev/api/films/1/')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  return (
    <div>
      <header>
        ai extension
      </header>
      <form onSubmit={onSubmit}>
        <input></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
