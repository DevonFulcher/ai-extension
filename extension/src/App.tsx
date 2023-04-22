import React, { useEffect, useState } from 'react';
import './App.css';
import { Configuration, OpenAIApi } from "openai";
import { Button } from "./components/Button";

function App() {
  const [apiKey, setApiKey] = useState<string>()
  const [openAI, setOpenAI] = useState<OpenAIApi>()
  const [summarization, setSummarization] = useState<string>()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setApiKey(e.target.value)
  }

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    chrome.storage.sync.set({ key: apiKey}).then(() => {
      const configuration = new Configuration({apiKey});
      setOpenAI(new OpenAIApi(configuration))
    });
  }

  useEffect(() => {
    chrome.storage.sync.get(["key"]).then((result) => {
      if (!result || !result.key) {
        return
      }
      const configuration = new Configuration({apiKey: result.key});
      setOpenAI(new OpenAIApi(configuration))
    });
  }, [])

  const getSummarization = async () => {
    if (!openAI) {
      console.log("openAI is undefined")
      return
    }
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    if (!tab || !tab.id) {
      console.log("tab or tab id is undefined")
      return
    }
    console.log(`sending message to tab with id: ${tab.id}`)
    const articleResponse = await chrome.tabs.sendMessage(tab.id, {request: "article"});
    console.log(articleResponse);
    const openaiResponse = await openAI.createCompletion({
      model: "text-davinci-003",
      prompt: "Summarize this:\n" + articleResponse.article,
      temperature: 0,
      max_tokens: 200,
    });
    console.log(openaiResponse)
    if (openaiResponse.data.choices.length > 0) {
      return openaiResponse.data.choices[0].text
    }
    return ""
  }

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    setIsLoading(true);
    const summarization = await getSummarization();
    setIsLoading(false);
    setSummarization(summarization)
  }

  const getContent = () => {
    if (summarization) {
      return <>{summarization}</>
    }
    if (!openAI) {
      return <form onSubmit={onSubmit}>
        <label htmlFor="save">OpenAI Key</label>
        <input onChange={onChange} id="save"></input>
        <button className="Margin-top" type="submit">Save</button>
      </form>
    }
    return <Button isLoading={isLoading} onClick={onClick}>Summarize Article</Button>
  }

  return (
    <div className="Container">
      <header>
        <h1>AI Extension</h1>
      </header>
      <div className="Content">
        {getContent()}
      </div>
    </div>
  );
}

export default App;
