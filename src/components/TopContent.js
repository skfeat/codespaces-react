import React from 'react';
import Typography from '@mui/material/Typography';
import { Button, Grid, Paper, Skeleton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function RecentContent() {
  const [recentAnimeList, setRecentAnimeList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('https://gogoanime.consumet.stream/top-airing')
      .then((response) => response.json())
      .then((animelist) => {
        const recentAnimeData = animelist.slice(0, 20); // Get data for 20 animes
        setRecentAnimeList(recentAnimeData);
        setLoading(false);
      });
  }, []);

  return (
    <Grid container spacing={1}>
      {loading ? (
        // Show skeleton while data is being fetched
        <>
          {Array.from({ length: 20 }).map((_, index) => (
            <Grid item xs={6} sm={6} md={3} key={index}>
              <Paper sx={{ borderRadius: '10px', marginBottom: 0 }} elevation={5}>
                <Skeleton animation="wave" variant="rectangular" height={240}  style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
                <Skeleton animation="wave" height={30} width="80%" style={{ marginBottom: 0,marginLeft:2 }} />
                <Skeleton animation="wave" height={20} width="50%" style={{  marginBottom: 4,marginLeft:2 }} />
              </Paper>
            </Grid>
          ))}
        </>
      ) : (
        // Show anime data once it's fetched
        <>
          {recentAnimeList.map((recentAnime) => (
            <Grid item xs={6} sm={6} md={3} key={recentAnime.id}>
              <Paper sx={{ borderRadius: '10px', marginBottom: 0 }} elevation={5}>
                <img
                  src={recentAnime.animeImg}
                  alt="random"
                  height={240}
                  width={168}
                  style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                />

                <center>
                  <Typography variant="body1" sx={{ p: 0 }}>
                    <b>{recentAnime.animeTitle}</b>
                  </Typography>
                  <Typography variant="body2" sx={{ p: 0 }}>
                   Latest  {recentAnime.latestEp}
                  </Typography>
                  <Button variant="text" size="small" sx={{ m: 1 }}>
                    <PlayCircleOutlineIcon />
                    Watch
                  </Button>
                </center>
              </Paper>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
