import { Button, CircularProgress, Container, List, ListItem, ListItemText, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const HackerNews = () => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0); 

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://hn.algolia.com/api/v1/search?query=${query}&page=${page}`);
      setData(prevData => [...prevData, ...response.data.hits]); 
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(0);
    setData([]);
    fetchData();
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleClick = () => {
    setIsLoading(true);
    fetchData(); 
  };

  useEffect(() => {
    fetchData();
  }, [query, page])

  return (
    <Container style={{ marginTop: '2rem' }}>
      <TextField
        fullWidth
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Hacker News"
        style={{ marginBottom: '1rem', fontFamily: "Verdana, Geneva, san-serif", backgroundColor: "#FEB941" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        style={{ display: 'block', margin: '0 auto', marginBottom: '1rem' }}
      >
        Search
      </Button>
      <List style={{backgroundColor: '#FFF1D0',}}>
        {data.map((item, index) => (
          <ListItem key={item.objectID} component="a" href={item.url} button>
            <ListItemText
              primary={
                <Typography variant="body1" component="span">
                  {`${index + 1}. ${item.title}`}
                </Typography>
              }
              secondary={item.author}
            />
          </ListItem>
        ))}
      </List>
      <Button
        style={{
          width: 1050,
          height: '5vh',
          backgroundColor: 'orange',
          color: 'black',
          borderRadius: '10px',
          marginTop: '1rem'
        }}
        onClick={handleClick}
        disabled={isLoading} // Disable button if loading
      >
        {isLoading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          <>
             Moree
          </>
        )}
      </Button>
    </Container>
  );
};

export default HackerNews;
