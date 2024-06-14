import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './App.css';
import * as React from 'react';
import usePagination from "./Pagination";
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Profile from './Profile';
import Peers from "./Peers";
import { alpha, styled } from '@mui/material/styles';
import SearchBar from './components/SearchBar';
import FullWidthTabs from './components/TopNavBar';
import Messages from './Messages';
import axios from 'axios';

const NavbarPagination = styled(Pagination)({
  '& .MuiPaginationItem-root': {
    color: 'white',
  },
  '& .MuiPaginationItem-page.Mui-selected': {
    backgroundColor: 'secondary',
  },
  '& .MuiPaginationItem-page:hover': {
    backgroundColor: alpha('#E0E3E7', 0.2),
  },
});


function App() {
  let [query, setQuery] = useState('');
  let [queryResults, setQueryResults] = useState([]);
  let [page, setPage] = useState(1);
  let [value, setValue] = useState(0);
  const [error, setError] = useState(null);
  // let [loading, setLoading] = useState(false);
  const partQuery = usePagination(queryResults, 10);

  function getTab(tab_index) {
    setValue(tab_index);
  }
  
  let handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  let handlePageChange = (event, value) => {
    setPage(value);

    partQuery.jump(value);
    // console.log('page:', value);
  }

  const handleSearch = () => {
    setPage(1);
    // console.log('loading in handleSearch before setting:', loading);
    // setLoading(true);
    // console.log('loading in handleSearch after setting:', loading);
    getSearchResults();
  }
  

  const Navbar = () => {
    const count = queryResults.length / 10;
    return (
      <Stack spacing={2}>
        <NavbarPagination count={count} page={page} color="secondary" sx={{color: "white"}} onChange={handlePageChange} />
      </Stack>
    );
  }

  const displayResults = () => {
    // console.log('queryResults:', queryResults.length);
    if (queryResults.length > 0) {
      // setLoading(false);
      // console.log('loading in display results:', loading);
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
      response1 = await axios.get('http://localhost:3001/search?query=' + query);
      data1 = response1.data;
    }
    catch (error) {
      setError(error);
      console.error('Error 1:', error);
      return;
    }

    let numPages = 10;
    results = data1.channels[0].items;

    for (let index = 1; index <= numPages; index++) {
      const startRecord = index * 10 + 1;

      try {
        const result = await axios.get('http://localhost:3001/search?query=' + query + '&startRecord=' + startRecord);
        const data = await result.data;
        results = results.concat(data.channels[0].items);
        // console.log('page:', index);

      } catch (error) {
        console.error('Error 2:', error);
      }

    }
    // console.log('results:', results);
    setQueryResults(results);
  }

  function getHashReceiver() {
    axios.get('http://localhost:3001/api/fetch_profile').then((data) => {
      //this console.log will be in our frontend console
      console.log(data)
    })
  }

  useEffect(() => {
    // getSearchResults();
  }, []);

  if (error) {
    return <div className='Error'>
        <p>Dear user, please make sure that the YaCy search engine is running on your local machine.</p>
        <p>Follow the instructions in the README file to start the YaCy search engine or use this link <a href="https://yacy.net/download_installation/" target="_blank" rel="noreferrer">YaCy Installation</a>.</p>
      </div>;
  }

  if( value  === 0){
    return (
      <div className="App">
      <FullWidthTabs setValueParent={getTab} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <h1>Re-Search Project (with YaCy integration)</h1>
        </Grid>
        <Grid item xs={12} className='search-bar'>
        <SearchBar color='secondary' className='textbox' label="Search for..." variant="outlined" size="small" value={query} onChange={handleSearchChange} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
        <Button variant="contained" color='secondary' size='large' sx={{ marginLeft: "1%" }} onClick={getHashReceiver}>TEST</Button>
        <Button variant="contained" color='secondary' size='large' sx={{ marginLeft: "1%" }} onClick={handleSearch}>Search</Button>
        </Grid>
        <Grid item xs={12}  >
        {queryResults.length > 0 && displayResults()}
        </Grid>
        <Grid item xs={12} className='navigation' >
        {queryResults.length > 0 && <Navbar />}
        </Grid>
      </Grid>
      {/* <Profile /> */}
      </div>
    );
  }
  else if(value === 1){
    return (
      <div className="App">
        <FullWidthTabs setValueParent={getTab}/>
        <Profile />
      </div>
    );
  }
  else if(value === 2){
    
    return (
      <div className="Peers">
        <FullWidthTabs setValueParent={getTab} />
        <Peers />
        
      </div>
    );
  }
  else if(value === 3){
    return (
      <div className="App">
        <FullWidthTabs setValueParent={getTab} />
        <Messages/>
      </div>
    );
  }

  
}

export default App;