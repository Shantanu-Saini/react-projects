import React from 'react'

const InputArea = ({ props, currencyOptions = [], selectedCurrency = 'usd' }) => {

    const { heading, amount, onAmountChnage, onCurrencyChange, } = props;

    return (
        <>
            <div className='bg-slate-600 w-full rounded my-5 text-white flex justify-between px-7 py-6 text-2xl'>
                <div className='space-y-4'>
                    <h3>{heading}</h3>

                    <input type="number" name="currency" className='text-black' value={amount}
                        onChange={(e) => onAmountChnage && onAmountChnage(Number(e.target.value))} />
                </div>
                <div className='space-y-4'>
                    <h3>Select Currency</h3>
                    <select name="currency" className='text-black'
                        value={selectedCurrency}
                        onChange={(e) => { onCurrencyChange && onCurrencyChange(e.target.value) }}>
                        {
                            currencyOptions.map((currency) => (
                                <option key={currency} value={currency}></option>
                            ))
                        }
                    </select>
                </div>
            </div>
        </>
    )
}

export default InputArea