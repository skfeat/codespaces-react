import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Skeleton, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { useLocation } from "react-router-dom";
export default function VideoPage() {

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [videoSource, setVideoSource] = useState('');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [data, setdata] = useState('');
  const [animedata, setanimedata] = useState('');

  const params = useParams();
  const { episodeId } = params;
  console.log(episodeId)
  const words1 = episodeId.split("-");
  words1.pop(); // remove the last element from the array
  const cleanEpisodeId = words1.join("-");


  const [totalepisode, settotaepisode] = useState('');
  let words4 = episodeId.split('-');
  let resultep = words4.slice(0, -2).join('-');
  const totalep = () => {
    fetch(`https://gogoanime.consumet.stream/anime-details/${resultep}`, {
      headers: {
        'Referer': 'https://anihdplay.com/',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.totalEpisodes);
        const tep = data.totalEpisodes
        settotaepisode(tep)
        setanimedata(data)
        console.log(animedata)
      })
      .catch(error => {
        console.log('Error fetching data:', error);
      });
  };
  useEffect(totalep, [totalepisode,animedata])


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
        // console.log(sourceUrl1 + "cors ki ma ki");
        // console.log(data.Referer)
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
  const disqus = () => {
    fetch(`https://gogoanime.consumet.stream/thread/${episodeId}?page=1`)
      .then(response => response.json())
      .then(data => {
        console.log(data.comments[1].author.name);
        setdata(data)
        // Process the retrieved data as needed
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  useEffect(disqus, [data])

  const numButtons = totalepisode
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
        <Grid item xs={12} sm={8} md={12}>
          {loading ? (
            <>
              <Skeleton variant="rectangular" animation="wave" width="90%" height={25} sx={{ borderRadius: '10px', marginBottom: 1, marginLeft: 1 ,marginTop:1}} />
              <Skeleton variant="rectangular" animation="wave" width="70%" height={25} sx={{ borderRadius: '10px', marginLeft: 1 }} />
            </>) : (
            <h2 style={{ marginTop: 0, color: 'grey', paddingLeft: '0.5rem', paddingRight: '0.5rem', marginBottom: -1 }}>{title}</h2>
          )}
          <Grid container justifyContent="center" sx={{ overflowX: 'hidden',overflowY: 'hidden',  marginTop: 2, marginLeft: 1, marginRight: 1, marginBottom: 2 }}>
            <Grid item xs={12} sm={8} md={12}>
              {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="95%" height={260} sx={{ borderRadius: '10px', }} />
              ) : (
                <center>
                <iframe
                  src={videoSource}
                  title="video player"
                  allowFullScreen
                  style={{
                    width: '65%',
                    height: '00px',
                    borderRadius: '10px',
                    boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)',
                    border: 'none'
                  }}
                />
                </center>
              )}

            </Grid>
          </Grid>
          <Accordion sx={{ marginTop: 2 }}>
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
                  height={25}
                  sx={{ borderRadius: '7px', marginLeft: "1px" }}
                />
              ) : (
                <Typography variant='h6'><b>Anime Details</b></Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
           <p> <b>Anime Name :</b> <span style={{color:"gray"}}>{animedata.animeTitle}</span></p>
           <p> <b>Other Name :</b> <span style={{color:"gray"}}>{animedata.otherNames}</span></p>
           <p>  <b>Release Date :</b> <span style={{color:"gray"}}>{animedata.releasedDate}</span></p>
           <p>   <b>Status
 :</b> <span style={{color:"green"}}>{animedata.status}</span></p>
           <p>   <b>Season/Type
 :</b> <span style={{color:"grey"}}>{animedata.type}</span></p>
           <p>   <b>Total Episodes
 :</b> <span style={{color:"grey"}}>{animedata.totalEpisodes}</span></p>
           <p>   <b>Synopsis :</b> <span style={{color:"grey"}}>{animedata.synopsis}</span></p>
            














            </AccordionDetails>
          </Accordion>
          <Accordion>
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
                  height={25}
                  sx={{ borderRadius: '7px', marginLeft: "1px" }}
                />
              ) : (
                <Typography variant='h6'><b>Episodes List</b></Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              {buttons}
            </AccordionDetails>
          </Accordion>
          {!data.comments ?(
            <>
              {loading ?(
                <>
      <center><Skeleton height={50} width="90%" style={{ marginBottom: 2,marginTop:2 }} />
                  <Skeleton variant="rectangular" height={200} style={{ marginBottom: '1rem' }} /></center> 
                  <Skeleton variant="rectangular" height={200} style={{ marginBottom: '1rem' }} />
                  <Skeleton variant="rectangular" height={200} style={{ marginBottom: '1rem' }} />
                </>
              ) : (<>
                <h3 style={{ paddingTop: 2, color: "GrayText", paddingLeft: '0.5rem', paddingRight: '0.5rem',paddingBottom: 2,textAlign:"center"}}>Comments Section</h3>
                <hr />
                <Typography variant="body1" color="text.secondary" style={{ textAlign: 'center', paddingTop: 2 }}>
                  No comments yet
                </Typography>
              </>
              )}
            </>
          ) : (
            <>
              <h3 style={{ paddingTop: 2, color: "GrayText", paddingLeft: '0.5rem', paddingRight: '0.5rem', marginBottom: -1 }}>Comments Section</h3>
              <hr />
              {Array.from({ length: 100 }).map((_, i) => (
                <Card md={6} sx={{ maxWidth: "100%",overflow:"hidden", marginTop: 1, marginBottom: 1 }} key={i}>
                  {data.comments && data.comments.length > i && (
                    <>
                      <CardHeader
                        avatar={<Avatar src={data.comments[i].author.avatar.cache} alt="my image" />}
                        title={data.comments[i].author.name}
                        subheader={new Date(data.comments[i].createdAt).toLocaleString().replace(/(\d{2})\/(\d{2})\/(\d{4}), (.*)/, "$4 on $2/$1/$3")}
                      />
                      <CardContent>
                        <Typography dangerouslySetInnerHTML={{__html:(data.comments[i].message).replace(/<\/?p>/g, '')}} variant="body2" color="text.secondary"/>
                      </CardContent>
                    </>
                  )}
                </Card>
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
}