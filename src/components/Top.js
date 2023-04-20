import React from 'react';
import TopContent from './TopContent';

export default function Recent() { 
  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Top Anime Airing this Season
      </h2>
      <div style={{paddingLeft:8,paddingRight:8}}>
  <TopContent/>
</div>

    </>
  );
}
