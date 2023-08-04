
import { useState } from "react"
import ExchangeRate from "./ExchangeRate"
import axios from 'axios'

function CurrencyConverter() {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [chosenPrimaryCurrency, SetChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, SetChosenSecondaryCurrency] = useState('BTC')
    const [exchangeRate, setexchangeRate] = useState(0)
    const [amount, setAmount] = useState(1)
    const [result, setResult] = useState(1)
    const [PrimaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState(1)
    const [SecondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState(1)
    const convert = async () => {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
              to_currency: chosenPrimaryCurrency + "",
              function: 'CURRENCY_EXCHANGE_RATE',
              from_currency: chosenSecondaryCurrency + ""
            },
            headers: {
              'X-RapidAPI-Key': '4de7fbfdbamsh3ab0224d96b4805p136b63jsndb83be7ffbfc',
              'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
            }
          };  
          try {
            const response = await axios.request(options);
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setexchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(exchangeRate * amount)
            setPrimaryCurrencyExchanged(chosenPrimaryCurrency)
            setSecondaryCurrencyExchanged(chosenSecondaryCurrency)
        } catch (error) {
            console.error(error);
        }
        
             
    }
    console.log(exchangeRate)
    

    
    
     return (
      <div className="Currency-Converter">
        <h2>Currency Converter</h2>

        <div className="input-box">
        <table>
            <tbody>
                <tr>
                <td>Primary Currency</td>
                <td>
                    <input
                        type = "number"
                        name = "currency-amount-1"
                        value={amount}
                        onChange={(event) =>setAmount(event.target.value)}
                        />
                </td>
                <td>
                    <select
                        value = {chosenPrimaryCurrency}
                        name="currency-option-1"
                        className="currency-options"
                        onChange={(event) => SetChosenPrimaryCurrency(event.target.value)}
                        > 
                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                        </select>

                </td>
                </tr>
            </tbody>
        </table>

        <table>
            <body>
                <td>Secondary Currency</td>
                <td>
                    <input
                        type = "number"
                        name = "currency-amount-2"
                        value={result}
                        disabled={true}
                        />
                </td>
                <td>
                    <select
                        value = {chosenSecondaryCurrency}
                        name="currency-option-2"
                        className="currency-options"
                        onChange={(event) => SetChosenSecondaryCurrency(event.target.value)}
                        >

                            {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                        </select>

                </td>
            </body>
        </table>
        <button id="convert-button" onClick={convert}>Convert</button>
        </div>
        <ExchangeRate 
            ExchangeRate = {exchangeRate}
            ChosenPrimaryCurrency = {PrimaryCurrencyExchanged}
            ChosenSecondaryCurrency = {SecondaryCurrencyExchanged}

        />
      </div>
    )
  }
  
  export default CurrencyConverter