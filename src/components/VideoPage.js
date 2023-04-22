import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Skeleton, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function VideoPage() {
  const [videoSource, setVideoSource] = useState('');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const params = useParams();
  const { episodeId } = params;
  console.log(episodeId)
  const words = episodeId.split("-");
  const episodeNumber = parseInt(words[words.length - 1]);
  const words1 = episodeId.split("-");
  words1.pop(); // remove the last element from the array
  const cleanEpisodeId = words1.join("-");
  useEffect(() => {
    const fetchVideoSource = async () => {
      try {
        const response = await fetch(`https://gogoanime.consumet.stream/vidcdn/watch/${episodeId}`, {
          headers: {
            'Referer': 'https://anihdplay.com/',
            'Access-Control-Allow-Origin': '*'
          }
        });
        const data = await response.json();
        const sourceUrl = data.Referer;
        const sourceUrl1 = data.sources_bk[0].file
        console.log(sourceUrl1 + "cors ki ma ki");
        console.log(data.Referer)
        setVideoSource(sourceUrl);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching video source:', error);
      }
    };
    fetchVideoSource();
    setTitle(
      episodeId
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    );
  }, [episodeId]);

  const numButtons = episodeNumber
  var buttonEpisodeId1 = `${cleanEpisodeId}-${episodeNumber - 1}`
  var buttonEpisodeId2 = `${cleanEpisodeId}-${episodeNumber + 1}`
  // Create an array of button components
  const buttons = [];
  for (let i = 1; i <= numButtons; i++) {
    var buttonEpisodeId = `${cleanEpisodeId}-${i}`;
    buttons.push(
      <Link to={`/watch/${buttonEpisodeId}`} key={i}>
        <Button variant="outlined" color="primary" sx={{ marginLeft: "5px", marginBottom: 1 }}>
          Ep {i}
        </Button>
      </Link>
    );
  }
  return (
    <>
      <Grid container justifyContent="center" sx={{ overflowX: 'hidden', marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          {loading ? (
            <>
              <Skeleton variant="rectangular" animation="wave" width="90%" height={25} sx={{ borderRadius: '10px', marginBottom: 1, marginLeft: 1 }} />
              <Skeleton variant="rectangular" animation="wave" width="70%" height={25} sx={{ borderRadius: '10px', marginLeft: 1 }} />
            </>) : (
            <h2 style={{ marginTop: 0, color: 'grey', paddingLeft: '0.5rem', marginBottom: -1 }}>{title}</h2>
          )}
          <Grid container justifyContent="center" sx={{ overflowX: 'hidden', marginTop: 2, marginLeft: 1, marginRight: 1, marginBottom: 2 }}>
            <Grid item xs={12} sm={8} md={6}>
              {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="95%" height={260} sx={{ borderRadius: '10px', }} />
              ) : (
                <iframe
                  src={videoSource}
                  title="video player"
                  allowFullScreen
                  style={{
                    width: '95%',
                    height: '260px',
                    borderRadius: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.25)'
                  }}
                />
              )}

            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {loading ? (
    <>

      <Skeleton variant="rectangular" animation="wave" width="25%" height={37} sx={{ borderRadius: '7px', marginLeft: 1 }} />
    </>) : (
            <Link to={`/watch/${buttonEpisodeId1}`}>
            <Button variant="outlined" color="primary" sx={{ marginLeft: 1, marginBottom: 2 }}>
              Previous
            </Button>
          </Link>
  )}
      {loading ? (
    <>

      <Skeleton variant="rectangular" animation="wave" width="25%" height={37} sx={{ borderRadius: '7px', marginRight: 1 }} />
    </>) : (
                 <Link to={`/watch/${buttonEpisodeId2}`}>
                 <Button variant="outlined" color="primary" sx={{ marginRight: 1, marginBottom: 2 }}>
                   Next
                 </Button>
               </Link>
  )}
          </div>
          <Accordion sx={{marginTop:2}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
           {loading ? (
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="80%"
        height={20}
        sx={{ borderRadius: '7px', marginLeft: "1px" }}
      />
    ) : (
      <Typography><b>Episodes List</b></Typography>
    )}
        </AccordionSummary>
        <AccordionDetails>
        {buttons}
        </AccordionDetails>
      </Accordion>
        </Grid>
      </Grid>
    </>
  );
}