import { Link } from 'react-router-dom';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { PAGES, URL } from '../../../routes/RouteConstants';
import { ReactComponent as Logo } from '../../../assets/logo.svg';
import style from './Header.module.css';

const LOGO_LABEL = 'Home Fitness';

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position='static' className={style['app-bar']}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            mr: 2,
            width: {
              md: '70px',
            },
            height: {
              md: '70px',
            }
          }}><Logo height='auto' /></Box>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href={URL.DEFAULT_URL}
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {LOGO_LABEL}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {PAGES.map((page) => (
                <MenuItem key={page.to} onClick={handleCloseNavMenu} href={page.to}>
                  <Link
                    to={page.to}
                    sx={{
                      textDecoration: 'none',
                      color: 'black',
                    }}
                  >
                    <Typography textAlign='center'>
                      {page.label}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{
            display: { xs: 'flex', md: 'none' },
            mr: 2,
            width: {
              xs: '30px',
            },
            height: {
              xs: '30px',
            }
          }}><Logo height='auto' /></Box>
          <Typography
            variant='h5'
            noWrap
            component='a'
            href={URL.DEFAULT_URL}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            {LOGO_LABEL}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {PAGES.map((page) => (
              <Button
                key={page.to}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', mr: 4 }}
              >
                <Link to={page.to}><Typography textAlign='center'>{page.label}</Typography></Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
