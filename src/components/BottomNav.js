import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { Link } from 'react-router-dom';

import './BottomNav.css';

export default function BottomNav() {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className="bottom-nav"
      style={{ position: 'fixed', bottom: 0, width: '100%' }}
    >
      <BottomNavigationAction
        label="Recents"
        value="recents"
        showLabel
        icon={<RestoreIcon />}
        component={Link}
        to="/"
      />

      <BottomNavigationAction
        label="Top Airing"
        value="top"
        showLabel
        icon={<EmojiEventsIcon />}
        component={Link}
        to="/top"
      />

      <BottomNavigationAction
        label="Popular"
        value="popular"
        component={Link}
        to="/popular"
        showLabel
        icon={<FavoriteIcon />}
      />

      <BottomNavigationAction
        label="Movies"
        showLabel
        value="movie"
        component={Link}
        to="/movie"
        icon={<LocalMoviesIcon />}
      />
    </BottomNavigation>
  );
}