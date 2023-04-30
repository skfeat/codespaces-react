import React, { useState } from 'react';
import { TextField, Button, Box, Grid, Paper, Typography, Skeleton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function Search() {
  const [searchText, setSearchText] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [searchpre, setsearchpre] = useState("Nothing to show here yet");

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    fetch(`https://gogoanime.consumet.stream/search?keyw=${searchText}`)
      .then((response) => response.json())
      .then((data) => {
        setSearchData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
    setsearchpre(null)
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', margin: '2px', marginTop: 3 }}>
          <TextField
            label="Search Anime"
            variant="outlined"
            placeholder="Search your anime.."
            value={searchText}
            onChange={handleInputChange}
            sx={{ mr: 1 }}
          />
          <Button variant="contained" color="primary" size="small" onClick={handleSearch}>
            <SearchIcon fontSize="medium" />
          </Button>
        </Box>
      </Box>
      <div style={{ paddingLeft: 8, paddingRight: 8 }}>

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><h3 style={{ color: "grey" }}>{searchpre}</h3></div>
        <Grid container spacing={1}>
          {loading ? (
            // Show skeleton while data is being fetched
            <>

              {Array.from({ length: 20 }).map((_, index) => (
                <Grid item xs={6} sm={6} md={2} key={index}>
              <Paper sx={{ borderRadius: '10px', marginBottom: 0 ,paddingBottom:1}} elevation={5}>
                <Skeleton animation="wave" variant="rectangular" height={240}  style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                <center><Skeleton animation="wave" height={30} width="80%" style={{ marginBottom: 0,marginLeft:2 }} />
                <Skeleton animation="wave" height={20} width="60%" style={{  marginBottom: 4,marginLeft:2 }} />
                <Skeleton animation="wave" height={30} width="40%" style={{  marginBottom: 1,marginLeft:2 }} />
                </center> </Paper>
                </Grid>
              ))}
            </>
          ) : (
            // Show anime data once it's fetched
            <>
              {searchData.map((recentAnime) => (
                <Grid item xs={6} sm={6} md={2} key={recentAnime.id}>

                  <Paper
                    sx={{
                      borderRadius: '10px',
                      marginBottom: 0,
                      paddingBottom: 1,
                      overflow: 'hidden',
                      marginTop: 1,
                    }}
                    elevation={5}
                  >

                    <img
                      src={recentAnime.animeImg}
                      alt="random"
                      style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px', maxWidth: '100%', maxHeight: '100%' }}
                    />

                    <center>
                      <Typography variant="body1" sx={{ padding: '2px' }}>
                        <b> {recentAnime.animeTitle}</b>
                      </Typography>
                      <Typography variant="body2" sx={{ padding: '2px' }}>
                        {recentAnime.status}
                      </Typography>
                      <Link to={`/watch/${recentAnime.animeId}-episode-1`}>
                        <Button variant="text" size="small" sx={{ m: 1 }}>
                          <PlayCircleOutlineIcon/>
                          Watch
                        </Button>
                      </Link>
                    </center>
                  </Paper>

                </Grid>
              ))}
            </>

          )}
        </Grid>
      </div>
    </>
  );
}
