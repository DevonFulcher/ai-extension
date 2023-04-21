import React from 'react';
import './App.css';
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "TODO",
});

function App() {
  const openai = new OpenAIApi(configuration);
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
      console.log("tab id is undefined")
      return
    }
    console.log(`sending message to tab with id: ${tab.id}`)
    const articleResponse = await chrome.tabs.sendMessage(tab.id, {request: "article"});
    console.log(articleResponse);
    const openaiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Summarize this:\n" + articleResponse.article,
      temperature: 0,
      max_tokens: 50,
    });
    console.log(openaiResponse)
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
