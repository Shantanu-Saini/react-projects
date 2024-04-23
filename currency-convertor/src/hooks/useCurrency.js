import { useEffect, useState } from "react";

function useCurrency(currencyName) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyName}.json`).
            then(res => res.json()).
            then(res => setData(res)).
            catch(err => console.log(err))
    }, [currencyName])
    return data;
}


export default useCurrency;