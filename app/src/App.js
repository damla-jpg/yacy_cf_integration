import {useState, useEffect} from 'react';
import './App.css';
import * as React from 'react';

const LOCALHOST_URL = "https://localhost:";
const LOCALHOST_URL_SECURE = "https://localhost:";
const YACY_DEFAULT_PORT = 8090;


function App() {
  let [query, setQuery] = useState('');
  let [queryResults, setQueryResults] = useState([]);
  let handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const displayResults = () => {
    console.log('queryResults:', queryResults.length);
    return queryResults.map((item, index) => {
      return (
        <div key={index}>
          <a href={item.link}>{item.title}</a>
          <p>{item.description}</p>
        </div>
      );
    });
  }

  const getSearchResults = async() => {
    try {
      const response = await fetch(`http://localhost:8090/yacysearch.json?query=${query}&resource=global&urlmaskfilter=.*&prefermaskfilter=&nav=all`);
      const data = await response.json();
      
      const numResults = data.channels[0].totalResults;
      let numPages = Math.ceil(numResults / 10);
      if (numPages > 75) {
        numPages = 75;
      }
      setQueryResults(data.channels[0].items);
      console.log('numResults:', numResults);
      console.log('numPages:', numPages);

      for (let index = 1; index <= numPages; index++) {
        const startRecord = index * 10 + 1;
        const result = await fetch(`http://localhost:8090/yacysearch.json?query=${query}&resource=global&urlmaskfilter=.*&prefermaskfilter=&nav=all&startRecord=${startRecord}`);
        const data = await result.json();
        setQueryResults(queryResults.concat(data.channels[0].items));
        console.log('page:', index);
        console.log('startRecord:', startRecord);
        console.log('items:', data.channels[0].items);
      }
      
    } catch (error) {
      console.error('Error:', error);
    }
    
  }

  const handleSearch = () => {
    getSearchResults();
  }

  useEffect(() => {
    getSearchResults();
}, []);
  
  return (
    <div className="App">
      <input
          type='text'
          value={query}
          onChange={handleSearchChange}
          placeholder='Search for...'
        />
      <button onClick={handleSearch}>Search</button>
      {queryResults.length > 0 && displayResults()}
    </div>
  );
}

export default App;
