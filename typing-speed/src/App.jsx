import React, { useEffect, useState } from 'react'
import paragraphData from './paragraphs.json';

const App = () => {

  const [duration, setDuration] = useState(60);
  const [timer, setTimer] = useState(duration);
  const [start, setStart] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [input, setInput] = useState("")
  const [disable, setDisable] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  const handleStart = () => {
    setStart(!start);
    setDisable(!disable);
  };

  useEffect(() => {
    setTimer(duration);
  }, [duration])

  useEffect(() => {
    let intervalId;
    if (timer > 0 && start) {
      intervalId = setInterval(() => { setTimer(prevTime => prevTime - 1) }, 1000)
    }
    return () => {
      clearInterval(intervalId)
    }

  }, [timer, start]);

  const handleDisplayText = () => {
    let index = Math.floor(Math.random() * paragraphData.paragraphs.length);
    setDisplayText(paragraphData.paragraphs[index]);
  }
  useEffect(()=>handleDisplayText, []);

  const handleInput = (e) => {
    setInput(e.target.value);
    console.log(input);

    let wordCounter = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] == ' ') {
        wordCounter++;
      }
    }
    setWordCount(wordCounter + 1);

    // stop typing
    if (timer === 0) {
      setDisable(!disable);
    }
  }

  const calculateWPM = () => {
    let wordsPerMin = 0;
    const words = input.trim().split(/\s+/).length;
    const timeTaken = (duration - timer) / 60; // in minutes
    wordsPerMin = Math.round(words / timeTaken);
    setWpm(wordsPerMin);
  };

  const calculateCPM = () => {
    let characterPerMin = 0;
    const charcters = input.split(/\s+/).join('').length;
    const timeTaken = (duration - timer) / 60; // in minutes
    characterPerMin = Math.round((charcters / timeTaken));
    setCpm(characterPerMin);
  }

  const calculateAccuracy = () => {
    const typedWords = input.trim().split(/\s+/);
    const displayedWords = displayText.trim().split(/\s+/);

    console.log(typedWords);
    console.log(displayedWords);

    // Count the number of correctly typed words
    let correctWords = 0;
    for (let i = 0; i < Math.min(typedWords.length, displayedWords.length); i++) {
      if (typedWords[i] === displayedWords[i]) {
        correctWords++;
      }
    }

    // Calculate accuracy as a percentage
    const accuracyPercentage = (correctWords / typedWords.length) * 100;
    setAccuracy(accuracyPercentage.toFixed(2)); // Round to two decimal places
  };


  useEffect(() => {
    if (timer === 0) {
      calculateWPM();
      calculateCPM();
      calculateAccuracy();
    }
  }, [input, timer])

  return (
    <>
      <div className='bg-violet-950 h-screen flex flex-col items-center justify-around px-20 py-5'>
        <h1 className='text-4xl text-white font-bold'>Fox Typing</h1>

        {/* Controllers */}
        <div className='flex w-1/2 justify-between items-center text-white text-lg'>
          <button
            className='bg-red-800 px-8 py-2 rounded-md shadow-lg border border-white text-2xl transition-all duration-300 hover:bg-red-600 hover:scale-105'
            onClick={handleStart}
            disabled={!disable}>
            Start
          </button>

          <div className='flex space-x-3 bg-orange-600 px-4 py-2 rounded-md'>
            <p>Duration : </p>
            <div className='flex space-x-2'>
              <button onClick={() => setDuration(30)} className='bg-orange-300 px-1 rounded hover:bg-orange-800 text-gray-900 hover:text-gray-200'>30</button>
              <button onClick={() => setDuration(60)} className='bg-orange-300 px-1 rounded hover:bg-orange-800 text-gray-900 hover:text-gray-200'>60</button>
              <button onClick={() => setDuration(90)} className='bg-orange-300 px-1 rounded hover:bg-orange-800 text-gray-900 hover:text-gray-200'>90</button>
            </div>
          </div>
          <p className=''>Time Remaining : {timer}</p>
        </div>

        {/* Action area */}
        <div className="flex justify-center items-center space-x-5">
          <textarea
            className="w-1/2 bg-gray-900 text-white p-4 rounded-lg"
            cols="50" rows="15"
            placeholder='Enter Your Paragraph Here'
            value={displayText}
            onChange={handleDisplayText}>
          </textarea>

          <textarea
            className="w-1/2 bg-gray-900 text-white p-4 rounded-lg"
            cols="50" rows="15"
            placeholder='Type here to practice...'
            value={input}
            onChange={handleInput}
            disabled={disable}>
          </textarea>
        </div>

        {/* Results */}
        <div className='flex w-full justify-between items-center text-white text-2xl'>
          <p>Word Count : {wordCount}</p>
          <p>WPM : {wpm}</p>
          <p>CPM : {cpm}</p>
          <p>Accuracy : {accuracy}</p>
        </div>
      </div>
    </>
  )
}

export default App