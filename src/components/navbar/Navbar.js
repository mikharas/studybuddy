import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import './navbar.css';

function Navbar({ logout }) {
  const handleLogout = () => logout();
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  console.log(handleLogout);

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
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            StudyBuddy&nbsp;
            <i className="fas fa-business-time" />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/profile"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/eventdashboard"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Events
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
              Logout
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
