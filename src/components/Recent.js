import React from 'react';
import RecentContent from './RecentContent';

export default function Recent() { 
  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Recent Anime Episode Releases
      </h2>
      <div style={{paddingLeft:8,paddingRight:8}}>
  <RecentContent/>
</div>

    </>
  );
}
