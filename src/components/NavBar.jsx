import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Dropdown, Menu, Image } from 'semantic-ui-react';

import images from '../assets/images';

const propTypes = {
  user: PropTypes.shape({}),
  onLogout: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
};

const defaultProps = {
  user: null,
};

function NavBar(props) {
  const { user, onLogout, pathname } = props;

  const isActive = path => pathname.includes(path);
  const AuthenticatedMenu = () => (
    <Menu.Menu position="right">
      <Dropdown item text={user.username}>
        <Dropdown.Menu>
          <Dropdown.Item text="My Profile" className="NavBar-item"  as={Link} to="/profile/" />
          <Dropdown.Item text="Logout" className="NavBar-item"  onClick={onLogout} />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  );
  const NotAuthenticatedMenu = () => (
    <Menu.Menu position="right">
      <Menu.Item name="sign up" className="NavBar-item"  as={Link} to="/signup/" />
      <Menu.Item name="login" className="NavBar-item"  as={Link} to="/login/" />
    </Menu.Menu>
  );

  return (
    <Menu fixed="top" size="large" secondary style={{backgroundColor:"white"}}>
      <Container>
        <Menu.Item name="glossm" as={Link} to="/" header>
          <Image src={images.logoTransparent} size="small"/>
        </Menu.Item>
        <Menu.Item name="learn" className="NavBar-item" as={Link} to="/learn/" active={isActive('learn/')} />
        <Menu.Item name="language" className="NavBar-item" as={Link} to="/language/" active={isActive('language/')} />
        {user ? <AuthenticatedMenu /> : <NotAuthenticatedMenu />}
      </Container>
    </Menu>
  );
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;
