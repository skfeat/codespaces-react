import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Skeleton,Button } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';

export default function RecentContent() {
  const [recentAnimeList, setRecentAnimeList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let animeData = [];
        for (let i = 1; i <= 3; i++) {
          const response = await fetch(`https://gogoanime.consumet.stream/anime-movies?page=${i}`);
          const animelist = await response.json();
          animeData = animeData.concat(animelist.slice(0, 20));
        }
        setRecentAnimeList(animeData);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Grid container spacing={1}>
      {loading ? (
        // Show skeleton while data is being fetched
        <>
          {Array.from({ length: 200 }).map((_, index) => (
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
          {recentAnimeList.map((recentAnime) => (
            <Grid item xs={6} sm={6} md={2} key={recentAnime.id}>
              <Paper
                sx={{
                  borderRadius: '10px',
                  marginBottom: 0,
                  paddingBottom: 1,
                  overflow: 'hidden',
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
                    <b>{recentAnime.animeTitle}</b>
                  </Typography>
                  <Typography variant="body2" sx={{ padding: '2px' }}>
                    Release {recentAnime.releasedDate}
                  </Typography>
                  <Link to={`/watch/${recentAnime.animeId}-episode-1`}>
                        <Button variant="text" size="small">
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
  );
}
