import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Button } from './Button';
import './navbar.css';

const useStyle = makeStyles((theme) => ({
  navbar: {
    background: theme.palette.primary.main,
  },
}));

function Navbar({ logout }) {
  const classes = useStyle();
  const handleLogout = () => logout();
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
                to="/profile"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <Typography variant="h6">Profile</Typography>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/eventdashboard"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                <Typography variant="h6">Events</Typography>
              </Link>
            </li>

            <li>
              <Link to="/" className="nav-links-mobile" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
          {button && (
            <Button buttonStyle="btn--outline" onClick={handleLogout}>
              <Typography variant="h6">Logout</Typography>
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
