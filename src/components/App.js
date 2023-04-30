import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
function NavBar() {


  return (
    <AppBar position="fixed">
      <Toolbar>
        <PlayCircleIcon align="center" />
        <Typography variant="h6" fontFamily="Ubuntu" align="center" sx={{ flexShrink: 0, textAlign: "center" }}>
  <b>AniStream</b>
</Typography>

        <div style={{ flexGrow: 1 }} />
        <Link to="/search">
        <IconButton sx={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>
          <SearchIcon />
        </IconButton>
      </Link>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
