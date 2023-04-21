import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { Skeleton } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function VideoPage() {
  const [videoSource, setVideoSource] = useState('');
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const { episodeId } = params;
    console.log(episodeId)

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
        console.log(sourceUrl1+"cors ki ma ki");
        console.log(data.Referer)
        setVideoSource(sourceUrl);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching video source:', error);
      }
    };
    fetchVideoSource();
  }, [params]);

  const title = params.episodeId?.split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <>
      <Grid container justifyContent="center" sx={{ overflowX: 'hidden', marginTop: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <h2 style={{ marginTop: 0, color: 'grey', paddingLeft: '0.5rem', marginBottom: -1 }}>{title}</h2>
          <Grid container justifyContent="center" sx={{ overflowX: 'hidden', marginTop: 2, marginLeft: 1, marginRight: 1, marginBottom: 2 }}>
            <Grid item xs={12} sm={8} md={6}>
              {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="95%" height={260} sx={{borderRadius: '10px',}} />
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
        </Grid>
      </Grid>
    </>
  );
}
