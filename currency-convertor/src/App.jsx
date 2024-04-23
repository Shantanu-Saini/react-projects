import React, { useState } from 'react'
import useCurrency from './hooks/useCurrency';
import InputArea from './components/InputArea';

const App = () => {

  console.log(useCurrency('usd'));
  const [amount, setAmount] = useState(0);
  const [currencyName , setCurrencyName] = useState('usd')

  return (
    <>
      <div className="flex justify-center items-center h-screen w-screen bg-slate-300">
        <div className='top-1/2 left-1/2'>
          <h1>Currency Converter</h1>
          <InputArea heading={"From"} amount={amount}/>
          <InputArea heading={"To"} />
        </div>
      </div>
    </>
  )
}

export default App