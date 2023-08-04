import { useEffect, useState } from "react";
import axios from "axios";

function NewsFeed() {
  const [articles, setArticles] = useState([])
  const [amt, setAmt] = useState(5)
  useEffect(() => {

const options = {
  method: 'GET',
  url: 'https://crypto-news16.p.rapidapi.com/news/top/' + amt,
  headers: {
    'X-RapidAPI-Key': '4de7fbfdbamsh3ab0224d96b4805p136b63jsndb83be7ffbfc',
    'X-RapidAPI-Host': 'crypto-news16.p.rapidapi.com'
  }
};// eslint-disable-next-line
const fetch = async () => {
try {
	const response = await axios.request(options);
	console.log(response.data)
  setArticles(response.data)
} catch (error) {
	console.error(error);
}}
  fetch()

  }, [amt])
  
const sum_api = async (TEXT) => {
  const options = {
    method: 'POST',
    url: 'https://gpt-summarization.p.rapidapi.com/summarize',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '4de7fbfdbamsh3ab0224d96b4805p136b63jsndb83be7ffbfc',
      'X-RapidAPI-Host': 'gpt-summarization.p.rapidapi.com'
    },
    data: {
      text: TEXT,
      num_sentences: 3
    }
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

async function getHtmlFromUrl(url) {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching HTML:', error);
    console.log(error);
  }
}
  
    return (
      <div className="News-feed">
        <h2>News feed</h2>
        <table>
            <body>
                <td>Number of Documents</td>
                <td>
                    <input
                        type = "number"
                        name = "docs"
                        value={amt}
                        onChange={(event) =>setAmt(event.target.value)}
                        />
                </td>
              </body>
        </table>

        {articles.map((article, _index) =>(<div key={_index}>(<a href={article.url}>(<p>{_index+1}.{article.title}</p>)</a><button id="convert-button" onClick={() => getHtmlFromUrl(article.url)}>Convert {_index + 1}</button>)</div>))}

      </div>
    )
  }
  
  export default NewsFeed