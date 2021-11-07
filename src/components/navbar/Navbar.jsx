import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Link, Redirect } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Button } from './Button';
import './navbar.css';

const useStyle = makeStyles((theme) => ({
  navbar: {
    background: theme.palette.primary.main,
  },
  profileIcon: {
    color: 'white',
  },
  profileIconButton: {
    marginRight: theme.spacing(3),
  },
  whiteText: {
    textDecoration: 'none',
    color: 'white',
  },
}));

function Navbar({ logout, isLoggedIn, user }) {
  const classes = useStyle();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className={`navbar ${classes.navbar}`}>
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <Typography variant="h2">StudyBuddy&nbsp;</Typography>
            <i className="fas fa-business-time" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                <Typography variant="h6">Home</Typography>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/events-explorer"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <Typography variant="h6">Events Explorer</Typography>
              </Link>
            </li>
          </ul>
          {isLoggedIn ? (
            <>
              <div className={classes.profileIconButton}>
                <IconButton>
                  <Link to={`/profile/${user}`}>
                    <PersonIcon
                      fontSize="large"
                      className={classes.profileIcon}
                    />
                  </Link>
                </IconButton>
              </div>
              <Button buttonStyle="btn--outline" onClick={logout}>
                <Typography variant="h6">Logout</Typography>
              </Button>
            </>
          ) : (
            <Button buttonStyle="btn--outline">
              <Link to="/login" className={classes.whiteText}>
                <Typography variant="h6">Login</Typography>
              </Link>
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
