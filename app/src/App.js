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
import Peers from './Peers';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { alpha, styled } from '@mui/material/styles';

const SearchBar = styled(TextField)({
  '& label': {
    color: '#E0E3E7',
  },
  '& label.Mui-focused': {
    color: 'secondary',
  },
  '& .MuiInputBase-input': {
    color: "white",
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#E0E3E7',
    },
    '&:hover fieldset': {
      borderColor: 'secondary',
    },
  },
});

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
  const theme = useTheme();
  let [value, setValue] = useState(0);
  let handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  let handlePageChange = (event, value) => {
    setPage(value);

    partQuery.jump(value);
    console.log('page:', value);
  }

  const handleSearch = () => {
    getSearchResults();
  }
  const partQuery = usePagination(queryResults, 10);

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }


  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
      </div>
    );
  }

  let handleChange = (event, newValue) => {
    console.log('newValue:', newValue);
    setValue(newValue);
  };

  let handleChangeIndex = (index) => {
    setValue(index);
  };


  function FullWidthTabs() {

    return (
      <Box sx={{ bgcolor: "transparent", width: "100%", marginBottom: "5%" }}>
        <AppBar position="static" sx={{ bgcolor: "transparent" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="search" {...a11yProps(0)} />
            <Tab label="profile" {...a11yProps(1)} />
            <Tab label="peers" {...a11yProps(2)} />
            <Tab label="messages" {...a11yProps(3)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3} dir={theme.direction}>
            Item Four
          </TabPanel>
        </SwipeableViews>
      </Box>
    );
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

  if( value  === 0){
    return (
      <div className="App">
        <FullWidthTabs />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h1>Re-Search Project (with YaCy integration)</h1>
          </Grid>
          <Grid item xs={12} className='search-bar'>
            <SearchBar color='secondary' className='textbox' label="Search for..." variant="outlined" size="small" value={query} onChange={handleSearchChange} />
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
        {/* <Peers /> */}
      </div>
    );
  }
  else if(value === 1){
    return (
      <div className="App">
        <FullWidthTabs />
        <Profile />
      </div>
    );
  }
  else if(value === 2){
    return (
      <div className="App">
        <FullWidthTabs />
        <Peers />
      </div>
    );
  }
  else if(value === 3){
    return (
      <div className="App">
        <FullWidthTabs />
        <h1>Messages</h1>
      </div>
    );
  }

  
}

export default App;