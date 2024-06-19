import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './App.css';
import * as React from 'react';
import usePagination from "./components/Pagination";
import Button from '@mui/material/Button';
import Profile from './pages/Profile';
import Peers from "./pages/Peers";
import { alpha, styled } from '@mui/material/styles';
import SearchBar from './components/SearchBar';
import FullWidthTabs from './components/TopNavBar';
import Settings from './pages/Settings';
import Messages from './pages/Messages';
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
        <NavbarPagination count={count} page={page} color="secondary" sx={{ color: "white" }} onChange={handlePageChange} />
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
          <a href={item.link} key={index} className='results'>
          <div key={index}>
            <p>🔗 {item.title} </p>
            {/* <p>{item.description}</p> */}
          </div>
          </a>
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


  useEffect(() => {
    // getSearchResults();
  }, []);

  if (error) {
    return <div className='Error'>
      <p>Dear user, please make sure that the YaCy search engine is running on your local machine.</p>
      <p>Follow the instructions in the README file to start the YaCy search engine or use this link <a href="https://yacy.net/download_installation/" target="_blank" rel="noreferrer">YaCy Installation</a>.</p>
    </div>;
  }

  if (value === 0) {
    return (
      <div className="App">
        <FullWidthTabs setValueParent={getTab} />
        <h1>Re-Search Project (with YaCy integration)</h1>
        <SearchBar color='secondary' className='textbox' label="Search for..." variant="outlined" size="small" value={query} onChange={handleSearchChange} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} />
        <Button variant="contained" color='secondary' size='large' sx={{ marginLeft: "1%" }} onClick={handleSearch}>Search</Button>
        <div>
          <div className='search-results'>
              {queryResults.length > 0 && displayResults()}
          </div>
          <div className='navigation'>
            {queryResults.length > 0 && <Navbar />}
          </div>
        </div>
        
        
        
      </div>
    );
  }
  else if (value === 1) {
    return (
      <div className="App">
        <FullWidthTabs setValueParent={getTab} />
        <Profile />
      </div>
    );
  }
  else if (value === 2) {

    return (
      <div className="Peers">
        <FullWidthTabs setValueParent={getTab} />
        <Peers />

      </div>
    );
  }
  else if (value === 3) {
    return (
      <div className="App">
        <FullWidthTabs setValueParent={getTab} />
        <Messages />
      </div>
    );
  }

  else if (value === 4) {
    return (
      <div className="App">
        <FullWidthTabs setValueParent={getTab} />
        <Settings />
      </div>
    );
  }


}

export default App;