import React from 'react';
import './App.css';

function App() {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    console.log(document.getElementsByTagName("article"))
    const message = { type: 'FETCH_DATA' };
    /*
    fetch('https://swapi.dev/api/films/1/')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
    */
  }

  (async () => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    if (tab.id === undefined) {
      return
    }
    const response = await chrome.tabs.sendMessage(tab.id, {request: "article"});
    console.log(response.article);
  })();

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
