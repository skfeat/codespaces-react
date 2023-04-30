import React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Paper, Skeleton,Button} from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { Link } from 'react-router-dom';



export default function RecentContent() {
  const [recentAnimeList, setRecentAnimeList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchRecentAnime = async (page) => {
      const response = await fetch(`https://gogoanime.consumet.stream/top-airing?page=${page}`);
      const animelist = await response.json();
      return animelist.slice(0, 20); // Get data for 20 animes
    };

    const fetchAllRecentAnime = async () => {
      const animeList = [];
      for (let page = 1; page <= 5; page++) {
        const recentAnimeData = await fetchRecentAnime(page);
        animeList.push(...recentAnimeData);
      }
      return animeList;
    };

    fetchAllRecentAnime().then((animeList) => {
      setRecentAnimeList(animeList);
      setLoading(false);
    });
  }, []);

  return (
    <Grid container spacing={1}>
      {loading ? (
        // Show skeleton while data is being fetched
        <>
          {Array.from({ length: 20 * 10 }).map((_, index) => (
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
                    <b>{recentAnime.animeTitle}</b>
                  </Typography>
                  <Typography variant="body2" sx={{ p: 0 }}>
                   Latest  {recentAnime.latestEp}
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
