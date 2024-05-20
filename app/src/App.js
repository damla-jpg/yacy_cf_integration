import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './App.css';
import * as React from 'react';
import usePagination from "./Pagination";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Profile from './Profile';

function App() {
  let [query, setQuery] = useState('');
  let [queryResults, setQueryResults] = useState([]);
  let [page, setPage] = useState(1);
  const partQuery = usePagination(queryResults, 10);

  const Navbar = () => {
    const count = queryResults.length / 10;
    return (
      <Stack spacing={2}>
        <Pagination count={count} page={page} color="primary" onChange={handlePageChange} />
      </Stack>
    );
  }

  let handlePageChange = (event, value) => {
    setPage(value);

    partQuery.jump(value);
    console.log('page:', value);
  }

  let handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    getSearchResults();
  }

  const displayResults = () => {
    // console.log('queryResults:', queryResults.length);
    if (queryResults.length > 0) {
      return partQuery.currentData().map((item, index) => {
        return (
          <div key={index} className='results'>
            <a href={item.link}>{item.title}</a>
            <p>{item.description}</p>
          </div>
        );
      });
    }
    else {
      return <div>No results found</div>;
    }
  }

  const getSearchResults = async () => {
    let results = [];
    let response1, data1;
    try {
      response1 = await fetch(`http://localhost:8090/yacysearch.json?query=${query}&resource=global&urlmaskfilter=.*&prefermaskfilter=&nav=all`);
      data1 = await response1.json();
    }
    catch (error) {
      console.error('Error 1:', error);
    }

    let numPages = 10;
    results = data1.channels[0].items;

    for (let index = 1; index <= numPages; index++) {
      const startRecord = index * 10 + 1;

      try {
        const result = await fetch(`http://localhost:8090/yacysearch.json?query=${query}&resource=global&urlmaskfilter=.*&prefermaskfilter=&nav=all&startRecord=${startRecord}`);
        const data = await result.json();
        results = results.concat(data.channels[0].items);
        console.log('page:', index);

      } catch (error) {
        console.error('Error 2:', error);
      }

    }
    console.log('results:', results);
    setQueryResults(results);
  }

  useEffect(() => {
    // getSearchResults();
  }, []);

  return (
    <div className="App">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1>Re-Search Project (with YaCy integration)</h1>
        </Grid>
        <Grid item xs={12} className='search-bar'>
          <TextField className='textbox' id="outlined-basic" label="Search for..." variant="outlined" size="small" value={query} onChange={handleSearchChange} />
          <Button variant="contained" onClick={handleSearch}>Search</Button>
        </Grid>
        <Grid item xs={12} className='results' >
          {queryResults.length > 0 && displayResults()}
        </Grid>
        <Grid item xs={12} className='navigation' >
          {queryResults.length > 0 && <Navbar />}
        </Grid>
      </Grid>
      <Profile />
    </div>
  );
}

export default App;