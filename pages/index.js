import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import VedantImage from '../assets/vedantrumi.png';


const Home = () => {
  const[userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
const [isGenerating, setIsGenerating] = useState(false)

const callGenerateEndpoint = async () => {
  setIsGenerating(true);
  
  console.log("Calling OpenAI...")
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userInput }),
  });

  const data = await response.json();
  const { output } = data;
  console.log("OpenAI replied this..", output.text)

  setApiOutput(`${output.text}`);
  setIsGenerating(false);
}

  const onUserChangedText = (event) =>{
      setUserInput(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>Cool Coach</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>CoolCoach v1.0</h1>
          </div>
          <div className="header-subtitle">
            <h2>Tell me your uncool goal?</h2>
          </div>
          <div className="prompt-container">
          <textarea 
          className="prompt-box" 
          placeholder="write your goal here" 
          value = {userInput} 
          onChange={onUserChangedText} 
          />
          <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'}
                onClick={callGenerateEndpoint}>
          <div className="generate">
          {isGenerating ? <span className="loader"></span> : <p>Give me a plan,coach!</p>}
          </div>
           </a>
              {/* <a className="generate-button" onClick={callGenerateEndpoint}>
                <div className="generate">
                    <p>Generate</p>
                </div>
            </a> */}
          </div>
          {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Your new SMART goal</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
        </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={VedantImage}/>
            <p>Your Cool Coach</p><br/>
            <p>Vedant Rumi</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
