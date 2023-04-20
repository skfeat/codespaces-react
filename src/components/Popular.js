import React from 'react';
import PopularContent from './PopularContent';

export default function Recent() { 
  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        Most Popular Animes
      </h2>
      <div style={{paddingLeft:8,paddingRight:8}}>
  <PopularContent/>
</div>

    </>
  );
}
