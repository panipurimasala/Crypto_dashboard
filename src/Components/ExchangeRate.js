const ExchangeRate = ({ExchangeRate, ChosenPrimaryCurrency, ChosenSecondaryCurrency}) => {
    return (
      <div className="Exchange-Rate">
        <h2>Exchange Rate</h2>
        <h3>{ExchangeRate}</h3>
        <p>{ChosenPrimaryCurrency} to {ChosenSecondaryCurrency}</p>
      </div>
    )
  }
  
  export default ExchangeRate