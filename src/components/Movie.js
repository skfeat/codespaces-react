import React from 'react';
import MovieContent from './MovieContent';

export default function Recent() { 
  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Anime Movies
      </h2>
      <div style={{paddingLeft:8,paddingRight:8}}>
  <MovieContent/>
</div>

    </>
  );
}
