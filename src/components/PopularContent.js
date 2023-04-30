import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Skeleton ,Button} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';



export default function RecentContent() {
  const [recentAnimeList, setRecentAnimeList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const pages = [1, 2, 3, 4, 5];
        const requests = pages.map((page) => fetch(`https://gogoanime.consumet.stream/popular?page=${page}`));
        const responses = await Promise.all(requests);
        const data = await Promise.all(responses.map((response) => response.json()));
        const recentAnimeData = data.flat().slice(0, 200); // Get data for 200 animes
        setRecentAnimeList(recentAnimeData);
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
            <Grid item xs={6} sm={6} md={3} key={index}>
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
            <Grid item xs={6} sm={6} md={3} key={recentAnime.id}>
                
              <Paper sx={{ borderRadius: '10px', marginBottom: 0 ,paddingBottom:1}} elevation={5}>
                <img
                  src={recentAnime.animeImg}
                  alt="random"
                  height={240}
                  width={168}
                  style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}
                />

                <center>
                  <Typography variant="body1" sx={{ p: 0 }}>
                    <b>{recentAnime.animeId.split('-')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  .join(' ')}</b>
                  </Typography>
                  <Typography variant="body2" sx={{ p: 0 }}>
                   Released {recentAnime.releasedDate}
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
